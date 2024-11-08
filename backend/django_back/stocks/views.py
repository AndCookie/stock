import requests
import json
import redis
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from stocks.utils import *
from datetime import datetime, timedelta, date
from django.conf import settings
from .models import StockData
from .serializers import StockDataSerializer
from django.db.models import Sum, F, ExpressionWrapper, FloatField


REAL_KIS_API_BASE_URL = "https://openapi.koreainvestment.com:9443"
PAPER_KIS_API_BASE_URL = "https://openapivts.koreainvestment.com:29443"

redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

@api_view(["GET"])
def kospi(request):
    return Response(indicators('kospi'), status=status.HTTP_200_OK)

@api_view(['GET'])
def kosdaq(request):
    return Response(indicators('kosdaq'), status=status.HTTP_200_OK)

@api_view(['GET'])
def nasdaq(request):
    return Response(indicators('nasdaq'), status=status.HTTP_200_OK)

@api_view(['GET'])
def sp500(request):
    return Response(indicators('s&p500'), status=status.HTTP_200_OK)

@api_view(['GET'])
def dji(request):
    return Response(indicators('dji'), status=status.HTTP_200_OK)

@api_view(['GET'])
def yen_dollar(request):
    return Response(indicators('yen_dollar'), status=status.HTTP_200_OK)

@api_view(['GET'])
def won_dollar(request):
    return Response(indicators('won_dollar'), status=status.HTTP_200_OK)

@api_view(['GET'])
def wti(request):
    return Response(indicators('wti'), status=status.HTTP_200_OK)

@api_view(['GET'])
def gold(request):
    return Response(indicators('gold'), status=status.HTTP_200_OK)

def indicators(indicator):
    # 캐시 안쓰면 3.5초 걸림
    # 캐리 쓰면 15ms로, 200배 차이남
    # 물론 DB 쓰는거랑 얼마나 차이나는지 확인해봐야함...
    cache_key = f"indicator_day_data:{indicator}"
    
    # 어제부터 3년 전까지의 날짜 범위 설정
    end_date = date.today()
    start_date = end_date - timedelta(days=3*365)  # 약 3년 전

    # Redis에서 기존 데이터를 가져오기
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    existing_dates = {json.loads(item)["stck_bsop_date"] for item in indicator_data}
    
    current_date = end_date - timedelta(days=1)
    while current_date >= start_date:
        end_date_str = current_date.strftime("%Y%m%d")
        start_date_str = (current_date - timedelta(weeks=12)).strftime("%Y%m%d")

        # 누락된 날짜에 대해 데이터 요청 및 저장
        if end_date_str not in existing_dates:
            if indicator in {'kospi', 'kosdaq'}:
                response_data = fetch_and_save_korea_indicator_day_data(end_date_str, indicator)
            elif indicator in {'nasdaq', 's&p500', 'dji', 'yen_dollar', 'won_dollar', 'wti', 'gold'}:
                response_data = fetch_and_save_overseas_indicator_day_data(start_date_str, end_date_str, indicator)
            if response_data:
                last_date = response_data[-1]["stck_bsop_date"]
                # 마지막 날짜 기준으로 업데이트 및 존재 확인
                if last_date != end_date_str:
                    current_date = datetime.strptime(last_date, "%Y%m%d").date()
                    if current_date.strftime("%Y%m%d") in existing_dates:
                        break  # 이미 가져온 날짜로 다시 돌아가면 중단
        else:
            break

        # 이전 날짜로 이동
        current_date -= timedelta(days=1)

    # Redis에 추가된 데이터를 다시 가져와 정렬
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    all_data = [json.loads(item) for item in indicator_data]

    # 'stck_bsop_date' 기준으로 오름차순 정렬 후 반환
    all_data.sort(key=lambda x: x["stck_bsop_date"])

    return all_data

def fetch_and_save_korea_indicator_day_data(date_str, indicator):
    print(f'{indicator}의 {date_str}의 데이터 가져옴')
    url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice"
    
    # 쿼리 파라미터 설정
    params = {
        "fid_cond_mrkt_div_code": "U",    # 시장 구분 코드
        "fid_input_iscd": "",         # 지수 코드
        "fid_input_date_1": date_str,     # 시작 날짜
        "fid_input_date_2": "",     # 종료 날짜
        "fid_period_div_code": "D"        # 기간 구분 코드 (D: 일별)
    }
    
    if indicator == 'kospi':
        params['fid_input_iscd'] = '0001'
    elif indicator == 'kosdaq':
        params['fid_input_iscd'] = '1001'
    else:
        print(f"indicator값을 확인해주세요. 현재 indicator는 {indicator}입니다.")
        return None
    
    headers = get_real_headers('FHKUP03500100')
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response_data = response.json()
        cache_key = f"indicator_day_data:{indicator}"
        
        pipe = redis_client.pipeline()  # 파이프라인 사용으로 일괄 저장

        for daily_data in response_data['output2']:
            timestamp = datetime.strptime(daily_data['stck_bsop_date'], "%Y%m%d").timestamp()
            pipe.zadd(cache_key, {json.dumps(daily_data): timestamp})

        pipe.execute()  # Redis에 일괄 저장
        return response_data['output2']  # 일별 데이터 반환
    else:
        print(f"Failed to fetch data for {indicator.upper()} on {date_str}: {response.status_code}")
        return None

def fetch_and_save_overseas_indicator_day_data(start_date_str, end_date_str, indicator):
    print(f'{indicator}의 {start_date_str}의 데이터 가져옴')
    url = f"{REAL_KIS_API_BASE_URL}/uapi/overseas-price/v1/quotations/inquire-daily-chartprice"
    
    # 쿼리 파라미터 설정
    params = {
        "fid_cond_mrkt_div_code": "N",    # 시장 구분 코드
        "fid_input_iscd": "",         # 지수 코드
        "fid_input_date_1": start_date_str,     # 시작 날짜
        "fid_input_date_2": end_date_str,     # 종료 날짜
        "fid_period_div_code": "D"        # 기간 구분 코드 (D: 일별)
    }
    
    if indicator == 'nasdaq':
        params['fid_input_iscd'] = 'COMP'
    elif indicator == 's&p500':
        params['fid_input_iscd'] = 'SPX'
    elif indicator == 'dji':
        params['fid_input_iscd'] = '.DJI'
    elif indicator == 'yen_dollar':
        params['fid_input_iscd'] = 'FX@JPY'
        params['fid_cond_mrkt_div_code'] = 'X'
    elif indicator == 'won_dollar':
        params['fid_input_iscd'] = 'FX@KRW'
        params['fid_cond_mrkt_div_code'] = 'X'
    elif indicator == 'wti':
        params['fid_input_iscd'] = 'WTIF'
    elif indicator == 'gold':
        params['fid_input_iscd'] = 'NYGOLD'
    else:
        print(f"indicator 값을 확인해주세요. 현재 indicator는 {indicator}입니다.")
        return None
    
    headers = get_real_headers('FHKST03030100')
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response_data = response.json()
        cache_key = f"indicator_day_data:{indicator}"
        
        pipe = redis_client.pipeline()  # 파이프라인 사용으로 일괄 저장

        for daily_data in response_data['output2']:
            timestamp = datetime.strptime(daily_data['stck_bsop_date'], "%Y%m%d").timestamp()
            pipe.zadd(cache_key, {json.dumps(daily_data): timestamp})

        pipe.execute()  # Redis에 일괄 저장
        return response_data['output2']  # 일별 데이터 반환
    else:
        print(f"Failed to fetch data for {indicator.upper()} on {start_date_str}: {response.status_code}")
        return None
    
@api_view(['GET'])
def minute_price(request):
    stock_code = request.GET.get('stock_code')
    if not stock_code:
        return Response({"error": "stock_code parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

    # 데이터 수집 종료 시간(현재 시간)과 시작 시간 설정
    end_time = datetime.now()
    start_time = datetime.combine(date.today(), datetime.strptime("090000", "%H%M%S").time())
    
    # Redis 키 설정
    cache_key = f"stock_min_data:{stock_code}"
    today_str = date.today().strftime("%Y%m%d")

    # 비어있는 시간을 확인하기 위한 목록
    missing_times = []
    all_data = []

    # Redis에서 모든 기존 데이터를 한번에 가져오기
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    
    # Redis 데이터에서 오늘 날짜와 일치하지 않는 항목을 삭제하고, 오늘 날짜 데이터만 필터링하여 저장
    for value in indicator_data:
        data = json.loads(value)
        if data.get("stck_bsop_date") != today_str:
            # 오늘 날짜가 아니면 Redis에서 삭제
            redis_client.zrem(cache_key, value)
        else:
            # 오늘 날짜에 해당하는 데이터만 수집
            all_data.append(data)

    # 현재 시간부터 09:00:00까지 30분씩 거슬러 올라가면서 확인
    current_time = end_time
    while current_time >= start_time:
        time_str = current_time.strftime("%H%M") + "00"
        
        # 해당 시간의 데이터가 없으면 누락 목록에 추가
        if not any(item["stck_cntg_hour"] == time_str for item in all_data):
            missing_times.append(time_str)
        
        current_time -= timedelta(minutes=30)

    # 누락된 시간대 데이터 요청
    if missing_times:
        for time_str in missing_times:
            response_data = fetch_and_save_stock_minute_data(stock_code, time_str)
            if response_data:
                all_data.extend(response_data)  # 가져온 30개 데이터를 추가

    # 'stck_cntg_hour' 기준으로 데이터 오름차순 정렬
    all_data.sort(key=lambda x: x["stck_cntg_hour"])

    return Response(all_data, status=status.HTTP_200_OK)

def fetch_and_save_stock_minute_data(stock_code, start_time_str):
    """주어진 시작 시간으로부터 30분 동안의 데이터를 가져와 Redis에 저장"""
    print(f'{stock_code}의 {start_time_str}의 데이터 가져옴')
    url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"
    params = {
        "FID_ETC_CLS_CODE": "",
        "FID_COND_MRKT_DIV_CODE": "J",
        "FID_INPUT_ISCD": stock_code,
        "FID_INPUT_HOUR_1": start_time_str,
        "FID_PW_DATA_INCU_YN": "Y"
    }
    
    headers = get_real_headers('FHKST03010200')

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response_data = response.json()
        cache_key = f"stock_min_data:{stock_code}"
        
        pipe = redis_client.pipeline()

        for minute_data in response_data['output2']:
            redis_time_str = minute_data['stck_cntg_hour']
            timestamp = int(datetime.combine(date.today(), datetime.strptime(redis_time_str, "%H%M%S").time()).timestamp())
            pipe.zadd(cache_key, {json.dumps(minute_data): timestamp})
        
        pipe.execute()
        return response_data['output2']
    else:
        print(f"Failed to fetch data for {stock_code} at {start_time_str}: {response.status_code}")
        return None
    
@api_view(['GET'])
def volume_ranking(request):
    response = rankings('volume')
    
    if response.status_code == 200:
        return Response(response.json()['output'], status=status.HTTP_200_OK)
    else:
        return Response({"error": "Failed to fetch data from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)
    
@api_view(['GET'])
def amount_ranking(request):
    response = rankings('amount')
    
    if response.status_code == 200:
        return Response(response.json()['output'], status=status.HTTP_200_OK)
    else:
        return Response({"error": "Failed to fetch data from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)

@api_view(['GET'])
def advance_ranking(request):
    response = rankings('advance')
    
    if response.status_code == 200:
        return Response(response.json()['output'], status=status.HTTP_200_OK)
    else:
        return Response({"error": "Failed to fetch data from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)

@api_view(['GET'])
def decline_ranking(request):
    response = rankings('decline')
    
    if response.status_code == 200:
        return Response(response.json()['output'], status=status.HTTP_200_OK)
    else:
        return Response({"error": "Failed to fetch data from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)

def rankings(rank_type):
    params = {
        "FID_COND_MRKT_DIV_CODE": "J", 
        "FID_INPUT_ISCD": "0001",
        "FID_DIV_CLS_CODE": "0",
        "FID_TRGT_CLS_CODE": "111111111",
        "FID_TRGT_EXLS_CLS_CODE": "000000",
        "FID_INPUT_PRICE_1": "0",
        "FID_INPUT_PRICE_2": "0",
        "FID_VOL_CNT": "0",
    }
    
    if rank_type in {'volume', 'amount'}:
        url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/volume-rank"
        params['fid_cond_scr_div_code'] = "20171"
        params['FID_INPUT_DATE_1'] = '0'
        
        if rank_type == 'volume':
            params['FID_BLNG_CLS_CODE'] = '0'
        else:
            params['FID_BLNG_CLS_CODE'] = '3'
            
        headers = get_real_headers('FHPST01710000')
    elif rank_type in {'advance', 'decline'}:
        url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/ranking/fluctuation"
        params['fid_cond_scr_div_code'] = "20170"
        params['fid_input_cnt_1'] = "0"
        params['fid_prc_cls_code'] = '1'
        params['fid_rsfl_rate1'] = ''
        params['fid_rsfl_rate2'] = ''
        
        if rank_type == 'advance':
            params['fid_rank_sort_cls_code'] = '0'
        else:
            params['fid_rank_sort_cls_code'] = '1'
            
        headers = get_real_headers('FHPST01700000', 'P')
    return requests.get(url, headers=headers, params=params)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def order(request):
    if request.method == 'GET':
        user = request.user
        orders = StockData.objects.filter(user=user).order_by('-execution_time')  # 최신 순으로 정렬
        serializer = StockDataSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        user = request.user
        stock_code = request.data.get('stock_code')
        trade_type = request.data.get('trade_type')
        amount = request.data.get('amount')
        order_type = request.data.get('order_type')
        try:
            price = request.data.get('price')
        except:
            price = "0"

        url = f"{PAPER_KIS_API_BASE_URL}/uapi/domestic-stock/v1/trading/order-cash"

        payload = {    
            "CANO": settings.PAPER_ACCOUNT,
            "ACNT_PRDT_CD": "01",
            "PDNO": stock_code,
            "ORD_DVSN": "00",  # 00: 지정가, 01: 시장가
            "ORD_QTY": amount,  # 주문 주식 수
            "ORD_UNPR": price  # 지정가인 경우 가격 담고, 시장가인 경우는 0으로
        }
        
        if order_type == "market":
            payload['ORD_DVSN'] = "01"
        
        if trade_type == 'buy':
            headers = get_paper_headers('VTTC0802U')  # 매수 주문
        elif trade_type == 'sell':
            headers = get_paper_headers('VTTC0801U')  # 매도 주문
        else:
            print(f"trade_type을 확인해주세요. 현재 trade_type은 {trade_type}입니다.")

        response =  requests.post(url, headers=headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            response = response.json()
            if response.get('rt_cd') == "0": # 성공
                serializer = StockDataSerializer()
                execution_date = datetime.now().strftime("%Y%m%d")

                if trade_type == 'sell':
                    amount *= -1
                stock_data_serializer = serializer(data={
                    "user": user,
                    "stock_code": stock_code,
                    "amount": amount, 
                    "price": price, 
                    "execution_date": execution_date, 
                    "execution_time": response['output']['ORD_TMD'], 
                    }
                )
                if stock_data_serializer.is_valid():
                    stock_data_serializer.save()
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    return Response(stock_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:  # 실패
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(response.json())
            return Response({"error": "Failed to order from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def holdings(request):
    user = request.user

    holdings = (
        StockData.objects.filter(user=user)
        .values('stock_code')
        .annotate(
            total_amount=Sum('amount'),  # 보유 수량의 합계
            total_value=Sum(F('price') * F('amount'))  # 가격 * 수량의 합
        )
        .annotate(
            average_price=ExpressionWrapper(F('total_value') / F('total_amount'), output_field=FloatField())  # 평균 가격 계산
        )
        .filter(total_amount__gt=0)  # 보유 수량이 0보다 큰 종목만 반환
    )

    response_data = [
        {
            "stock_code": holding["stock_code"],
            "total_amount": holding["total_amount"],
            "average_price": holding["average_price"],
        }
        for holding in holdings
    ]
    
    # 주식 현재가 가져와서 비교해야함
    for holding in holdings:
        stock_code = holding['stock_code']
        current_price = current_price(stock_code)
        pass

    return Response(response_data, status=status.HTTP_200_OK)

# 주식 현재가 시세
def current_price(stock_code):
    # 이거 비동기로 만들어야 주식을 빠르게 가져올 수 있을 것 같아..
    # 그렇지 않은 거랑 아닌거랑 확인해보쟝
    params = {
        "FID_COND_MRKT_DIV_CODE": "J", 
        "FID_INPUT_ISCD": stock_code,
    }
    
    url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price"
    headers = get_paper_headers('FHKST01010100')
    
    return requests.get(url, headers=headers, params=params)

# 실전 투자 헤더 생성 함수
def get_real_headers(tr_id, custtype=""):
    basic_headers = {
        'content-type': 'application/json',
        'authorization': settings.REAL_API_TOKEN,
        'appkey': settings.REAL_APP_KEY,
        'appsecret': settings.REAL_APP_SECRET,
        'tr_id': tr_id,
    }
    
    if custtype != "":
        basic_headers["custtype"] = custtype
        
    return basic_headers

# 모의 투자 헤더 생성 함수
def get_paper_headers(tr_id):
    basic_headers = {
        'content-type': 'application/json',
        'authorization': settings.PAPER_API_TOKEN,
        'appkey': settings.PAPER_APP_KEY,
        'appsecret': settings.PAPER_APP_SECRET,
        'tr_id': tr_id,
    }
        
    return basic_headers