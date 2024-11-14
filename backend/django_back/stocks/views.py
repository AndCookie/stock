import requests, json, redis, asyncio, httpx, time
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from stocks.utils import *
from datetime import datetime, timedelta, date
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import StockData
from .serializers import StockDataSaveSerializer, StockDataSerializer
from django.db.models import Sum, F, ExpressionWrapper, FloatField


REAL_KIS_API_BASE_URL = "https://openapi.koreainvestment.com:9443"
PAPER_KIS_API_BASE_URL = "https://openapivts.koreainvestment.com:29443"

redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
User = get_user_model()

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
    
    current_date = end_date  # 이대로 한번의 요청은 가나?확인 필요
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

    # Redis에서 모든 기존 데이터를 한 번에 가져오기
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    all_data = []
    existing_times = set()  # 이미 존재하는 stck_cntg_hour 값을 저장할 set

    # 오늘 날짜 데이터 필터링 및 Redis에서 오래된 데이터 삭제
    for value in indicator_data:
        data = json.loads(value)
        if data.get("stck_bsop_date") != today_str:
            redis_client.zrem(cache_key, value)  # 오늘 데이터가 아닌 경우 삭제
        else:
            all_data.append(data)  # 오늘 데이터만 유지
            existing_times.add(data["stck_cntg_hour"])  # 오늘 데이터의 시간 기록

    # 누락된 시간대 확인 및 요청
    current_time = end_time
    while current_time >= start_time:
        time_str = current_time.strftime("%H%M") + "00"
        
        # 이미 Redis에 해당 시간이 존재하면 건너뜀
        if time_str not in existing_times:
            # 누락된 데이터 요청 및 Redis에 저장
            fetch_and_save_stock_minute_data(stock_code, time_str)
        
        current_time -= timedelta(minutes=30)

    # Redis에 추가된 데이터를 다시 가져와 정렬
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    all_data = [json.loads(item) for item in indicator_data]
    all_data.sort(key=lambda x: x["stck_cntg_hour"])

    return Response(all_data, status=status.HTTP_200_OK)

def fetch_and_save_stock_minute_data(stock_code, time_str):
    url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"

    # 요청 파라미터 설정
    params = {
        "FID_ETC_CLS_CODE": "", 
        "FID_COND_MRKT_DIV_CODE": "J",  # 시장 구분 코드
        "fid_input_iscd": stock_code,
        "FID_INPUT_HOUR_1": time_str,  # 요청할 시간대
        "FID_PW_DATA_INCU_YN": "Y"
    }
    headers = get_real_headers('FHKST03010200')

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response = response.json()
        cache_key = f"stock_min_data:{stock_code}"

        # Redis에 데이터 저장
        pipe = redis_client.pipeline()
        for minute_data in response['output2']:
            pipe.zadd(cache_key, {json.dumps(minute_data): minute_data['stck_cntg_hour']})
        pipe.execute()

        return response['output2']  # 새로 가져온 데이터를 반환
    else:
        print(response.json())
        print(f"Failed to fetch minute data for {stock_code} at {time_str}: {response.status_code}")
        return None

@api_view(['GET'])
def stock_price(request):
    period_code = request.GET.get('period_code')
    stock_code = request.GET.get('stock_code')
    
    cache_key = f"stock_{period_code}_data:{stock_code}"
    
    end_date = date.today()
    start_date = end_date - timedelta(days=100*365)  # 약 100년 전
    start_date_str = start_date.strftime("%Y%m%d")
    # Redis에서 기존 데이터를 가져오기
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    existing_dates = {json.loads(item)["stck_bsop_date"] for item in indicator_data}
    
    # current_date = end_date - timedelta(days=1)
    current_date = end_date  # 당일 일봉 
    while current_date >= start_date:
        end_date_str = current_date.strftime("%Y%m%d")
        # 누락된 날짜에 대해 데이터 요청 및 저장
        if end_date_str not in existing_dates:
            response_data = fetch_and_save_stock_data(start_date_str, end_date_str, stock_code, period_code)
            if len(response_data):
                last_date = response_data[-1]["stck_bsop_date"]
                # 마지막 날짜 기준으로 업데이트 및 존재 확인
                current_date = datetime.strptime(last_date, "%Y%m%d").date()
            else:
                break
        else:
            break

        # 이전 날짜로 이동
        current_date -= timedelta(days=1)
        time.sleep(0.1)

    # Redis에 추가된 데이터를 다시 가져와 정렬
    indicator_data = redis_client.zrange(cache_key, 0, -1, withscores=False)
    all_data = [json.loads(item) for item in indicator_data]

    # 'stck_bsop_date' 기준으로 오름차순 정렬 후 반환
    all_data.sort(key=lambda x: x["stck_bsop_date"])

    return Response(all_data, status=status.HTTP_200_OK)

def fetch_and_save_stock_data(start_date_str, end_date_str, stock_code, period_code):
    print(f'{stock_code}의 {end_date_str}의 데이터 가져옴')
    url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice"
    
    # 쿼리 파라미터 설정
    params = {
        "fid_cond_mrkt_div_code": "J",    # 시장 구분 코드
        "fid_input_iscd": stock_code,         # 종목 코드
        "fid_input_date_1": start_date_str,     # 시작 날짜
        "fid_input_date_2": end_date_str,     # 종료 날짜
        "fid_period_div_code": period_code,         # 기간 구분 코드 (D, W, M, Y)
        "fid_org_adj_prc": "0"
    }
    
    headers = get_real_headers('FHKST03010100')
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response_data = response.json()
        cache_key = f"stock_{period_code}_data:{stock_code}"
        
        pipe = redis_client.pipeline()  # 파이프라인 사용으로 일괄 저장
        for daily_data in response_data['output2']:
            if not daily_data.get("stck_bsop_date"):
                break
            timestamp = datetime.strptime(daily_data['stck_bsop_date'], "%Y%m%d").timestamp()
            pipe.zadd(cache_key, {json.dumps(daily_data): timestamp})

        pipe.execute()  # Redis에 일괄 저장
        while response_data['output2'] and "stck_bsop_date" not in response_data['output2'][-1]:
            response_data['output2'].pop()
        return response_data['output2']  # 일별 데이터 반환
    else:
        print(f"Failed to fetch data for {stock_code} on {start_date_str}: {response.status_code}")
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
        incomplete_data = StockData.objects.filter(user=user).exclude(remain_amount=0).order_by('-execution_date', '-execution_time')
        for data in incomplete_data:
            execution_date = data.execution_date.strftime("%Y%m%d")
            order_number = data.order_number
            url = f"{PAPER_KIS_API_BASE_URL}/uapi/domestic-stock/v1/trading/inquire-daily-ccld"
            headers = get_paper_headers("VTTC8001R")
            params = {
                "CANO": settings.PAPER_ACCOUNT, 
                "ACNT_PRDT_CD": "01", 
                "INQR_STRT_DT": execution_date, 
                "INQR_END_DT": execution_date, 
                "SLL_BUY_DVSN_CD": "00", 
                "INQR_DVSN": "00", 
                "PDNO": "", 
                "CCLD_DVSN": "00", # 00: 전체, 01: 체결, 02: 미체결
                "ORD_GNO_BRNO": "", 
                "ODNO": order_number, 
                "INQR_DVSN_3": "00", 
                "INQR_DVSN_1": "", 
                "CTX_AREA_FK100": "", 
                "CTX_AREA_NK100": ""
            }
            response = requests.request("GET", url, headers=headers, params=params)
            if response.status_code == 200:    
                response_data = response.json()
                output = response_data['output1'][0]
                data.remain_amount = output.get('rmn_qty')
                data.price = output.get('tot_ccld_amt')
                data.save()
            else:
                print(response.json())
                return Response({"error": "Failed to order from KIS API"}, status=status.HTTP_502_BAD_GATEWAY)
            time.sleep(0.25)
        stock_data = StockData.objects.filter(user=user).order_by('-execution_date', '-execution_time')
        serializer = StockDataSerializer(instance=stock_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    if request.method == 'POST':
        user = request.user
        stock_code = request.data.get('stock_code')
        trade_type = request.data.get('trade_type')
        amount = request.data.get('amount')
        price = request.data.get('price')
        target_price = request.data.get('target_price')
        
        payload = {
            "CANO": settings.PAPER_ACCOUNT,
            "ACNT_PRDT_CD": "01",
            "PDNO": stock_code,
            "ORD_DVSN": "00",  # 00: 지정가, 01: 시장가
            "ORD_QTY": amount,  # 주문 주식 수
            "ORD_UNPR": price  # 지정가인 경우 가격 담고, 시장가인 경우는 0으로
        }
        
        if target_price == "0":
            # 시장가 주문
            if price == "0":
                payload['ORD_DVSN'] = "01"
            # 아니면 지정가 주문
        # 조건 주문
        else:
            pass
        url = f"{PAPER_KIS_API_BASE_URL}/uapi/domestic-stock/v1/trading/order-cash"

        headers = get_paper_headers('VTTC0802U' if trade_type == 'buy' else 'VTTC0801U')
        response =  requests.post(url, headers=headers, data=json.dumps(payload))
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get('rt_cd') == "0": # 성공
                output = response_data.get('output')
                execution_date = datetime.now().strftime("%Y%m%d")
                order_number = output.get('ODNO')
                execution_time = output.get('ORD_TMD')
                
                amount = int(amount)
                if trade_type == 'sell':
                    amount *= -1
                serializer = StockDataSaveSerializer(data={
                    "user": user.id,
                    "stock_code": stock_code,
                    "amount": amount, 
                    "price": int(price) * amount, 
                    "order_number": order_number, 
                    "execution_date": execution_date, 
                    "execution_time": execution_time, 
                    "remain_amount": amount
                    }
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:  # 실패
                print(response.json())
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
            total_amount=Sum('amount'),  # 보유 수량 합계
            total_value=Sum(F('price') * F('amount'))  # 총 가치
        )
        .annotate(
            average_price=ExpressionWrapper(F('total_value') / F('total_amount'), output_field=FloatField())
        )
        .filter(total_amount__gt=0)  # 보유 수량이 0 이상인 종목만 반환
    )

    stock_codes = [holding["stock_code"] for holding in holdings]

    current_prices = asyncio.run(fetch_current_prices(stock_codes))

    response_data = [
        {
            "stock_code": holding["stock_code"],
            "total_amount": holding["total_amount"],
            "average_price": holding["average_price"],
            "current_price": current_prices.get(holding["stock_code"]),
        }
        for holding in holdings
    ]

    return Response(response_data, status=status.HTTP_200_OK)

# Fetch 주식 현재가 비동기 요청
async def fetch_current_prices(stock_codes):
    semaphore = asyncio.Semaphore(10)  # 최대 동시 요청 제한
    async with httpx.AsyncClient() as client:
        tasks = [get_stock_price(client, stock_code, semaphore) for stock_code in stock_codes]
        responses = await asyncio.gather(*tasks)
        return {stock_code: price for stock_code, price in responses if price is not None}

async def get_stock_price(client, stock_code, semaphore):
    async with semaphore:  # 세마포어로 요청 동시성 제어
        url = f"{REAL_KIS_API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price"
        headers = get_paper_headers('FHKST01010100')
        params = {
            "FID_COND_MRKT_DIV_CODE": "J",
            "FID_INPUT_ISCD": stock_code,
        }

        try:
            response = await client.get(url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                price = data.get('output', {}).get('stck_prpr')  # 현재가
                return stock_code, price
            else:
                print(f"Failed to fetch price for {stock_code}: {response.status_code}")
        except Exception as e:
            print(f"Error fetching price for {stock_code}: {e}")
        return stock_code, None

@api_view(['GET'])
def all_time_rankings(request):
    top_users = User.objects.order_by('-balance')[:3]
    response_data = [
            {
                "username": user.username,
                "return_rate": round(user.balance / 5000000, 2)
            }
            for user in top_users
        ]
    
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_time_rankings(request):
    top_users = User.objects.order_by('-balance')[:3]
    response_data = [
            {
                "username": user.username,
                "return_rate": round(user.balance / 5000000, 2)
            }
            for user in top_users
        ]
    
    return Response(response_data, status=status.HTTP_200_OK)

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