import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
import websockets
# from accounts.models import FavoriteStock
# from django.contrib.auth import get_user_model


class KISWebSocketConsumer(AsyncWebsocketConsumer):
    kis_socket = None
    tasks = {}  # 클라이언트별 종목코드 추적

    async def connect(self):
        await self.accept()
        if not KISWebSocketConsumer.kis_socket:
            asyncio.create_task(self.connect_to_kis())
        await self.send(json.dumps({"message": "WebSocket connection established"}))
        print(f"WebSocket connection established: {self.channel_name}")

    async def disconnect(self, close_code):
        # 클라이언트가 연결 해제 시, 해당 클라이언트의 종목 코드 제거
        if self.channel_name in KISWebSocketConsumer.tasks:
            del KISWebSocketConsumer.tasks[self.channel_name]
        print(f"Disconnected client: {self.channel_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        stock_code = data.get("stock_code")
        exit_request = data.get("exit")
        username = data.get('username')

        if not self.channel_name in KISWebSocketConsumer.tasks:
            KISWebSocketConsumer.tasks[self.channel_name] = set()  # 클라이언트별 종목 목록 초기화
            
        # if username:
        #     User = get_user_model()
        #     user = User.objects.get(username=username)
        #     favorite_stocks =  FavoriteStock.objects.get(user=user)
        #     for favorite_stock in favorite_stocks:
        #         stock_code = favorite_stock.stock_code
        #         KISWebSocketConsumer.tasks[self.channel_name].add(stock_code)
        #         await self.request_to_kis("2", "H0STCNT0", stock_code)  # 주식 호가 실시간 해제
            

        if exit_request:
            # 특정 종목 추적 중단 요청
            if stock_code in KISWebSocketConsumer.tasks[self.channel_name]:
                KISWebSocketConsumer.tasks[self.channel_name].remove(stock_code)
                await self.request_to_kis("2", "H0STASP0", stock_code)  # 주식 체결 실시간 해제
                await self.request_to_kis("2", "H0STCNT0", stock_code)  # 주식 호가 실시간 해제
            return

        if stock_code:
            # 새로운 종목 추적 요청
            KISWebSocketConsumer.tasks[self.channel_name].add(stock_code)
            if KISWebSocketConsumer.kis_socket:
                await self.request_to_kis("1", "H0STASP0", stock_code)  # 주식 체결 실시간 등록
                await self.request_to_kis("1", "H0STCNT0", stock_code)  # 주식 호가 실시간 등록

    async def connect_to_kis(self):
        try:
            async with websockets.connect("ws://ops.koreainvestment.com:21000") as socket:
                KISWebSocketConsumer.kis_socket = socket
                print("Connected to KIS WebSocket")

                while True:
                    message = await socket.recv()
                    data = self.parse_kis_data(message)
                    if not data:
                        continue
                    # print("send_data:", json.dumps(data))
                    # 각 클라이언트의 구독 목록 확인 후 데이터 전송
                    for channel_name, stock_codes in KISWebSocketConsumer.tasks.items():
                        if data.get("stock_code") in stock_codes:
                            await self.channel_layer.send(
                                channel_name,
                                {"type": "send_stock_data", "data": data},
                            )
                            print(f"Sending data to channel {channel_name}: {data}")
        except Exception as e:
            print(f"KIS WebSocket connection error: {e}")
            KISWebSocketConsumer.kis_socket = None

    async def send_stock_data(self, event):
        await self.send(json.dumps(event["data"]))

    def parse_kis_data(self, message):
        try:
            parts = message.split("|")
            if len(parts) >= 4:
                if parts[1] == "H0STASP0":
                    result = self.stock_hoka(parts[3])
                elif parts[1] == "H0STCNT0":
                    result = self.stock_purchase(parts[3])
                return result
            return {}
        except Exception as e:
            print(f"Error parsing KIS data: {e}")
            return {}

    def stock_purchase(self, data):
        pValue = data.split('^')
        ret = {
            'trading': {    
                'STCK_CNTG_HOUR': pValue[1],     # 주식 체결 시간 (예: HHMMSS)
                'STCK_PRPR': pValue[2],          # 주식 현재가
                'CNTG_VOL': pValue[12],          # 체결 거래량
                'ACML_VOL': pValue[13],          # 누적 거래량
                'CTTR': pValue[18],              # 체결 강도 (매수/매도 비율)
                'CCLD_DVSN': pValue[21],         # 체결 구분 (매수: 1, 매도: 5)
            }, 
            'stock_code': pValue[0]              # 종목 코드
        }
        return ret
    
    def stock_hoka(self, data):
        pValue = data.split('^')
        ret = {
            'ORDER_BOOK': {    
                'ASKP1': pValue[3],
                'ASKP2': pValue[4],
                'ASKP3': pValue[5],
                'ASKP4': pValue[6],
                'ASKP5': pValue[7],
                'ASKP6': pValue[8],
                'ASKP7': pValue[9],
                'ASKP8': pValue[10],
                'ASKP9': pValue[11],
                'ASKP10': pValue[12],
                'BIDP1': pValue[13],
                'BIDP2': pValue[14],
                'BIDP3': pValue[15],
                'BIDP4': pValue[16],
                'BIDP5': pValue[17],
                'BIDP6': pValue[18],
                'BIDP7': pValue[19],
                'BIDP8': pValue[20],
                'BIDP9': pValue[21],
                'BIDP10': pValue[22],
                'ASKP_RSQN1': pValue[23],
                'ASKP_RSQN2': pValue[24],
                'ASKP_RSQN3': pValue[25],
                'ASKP_RSQN4': pValue[26],
                'ASKP_RSQN5': pValue[27],
                'ASKP_RSQN6': pValue[28],
                'ASKP_RSQN7': pValue[29],
                'ASKP_RSQN8': pValue[30],
                'ASKP_RSQN9': pValue[31],
                'ASKP_RSQN10': pValue[32],
                'BIDP_RSQN1': pValue[33],
                'BIDP_RSQN2': pValue[34],
                'BIDP_RSQN3': pValue[35],
                'BIDP_RSQN4': pValue[36],
                'BIDP_RSQN5': pValue[37],
                'BIDP_RSQN6': pValue[38],
                'BIDP_RSQN7': pValue[39],
                'BIDP_RSQN8': pValue[40],
                'BIDP_RSQN9': pValue[41],
                'BIDP_RSQN10': pValue[42],
                'TOTAL_ASKP_RSQN': pValue[43],
                'TOTAL_BIDP_RSQN': pValue[44],
            }, 
            'stock_code': pValue[0]
        }
        return ret

    def get_payload(self, tr_type, tr_id, stock_code):
        payload = {
                    "header": {
                        "approval_key": settings.REAL_APPROVAL_KEY,
                        "custtype": "P",
                        "tr_type": tr_type,  # 구독 시작: 1, 구독 취소: 2
                        "content-type": "utf-8",
                    },
                    "body": {
                        "input": {"tr_id": tr_id, "tr_key": stock_code},
                    },
                }
        return payload
    
    async def request_to_kis(self, tr_type, tr_id, stock_code):
        payload = self.get_payload(tr_type, tr_id, stock_code)
        await KISWebSocketConsumer.kis_socket.send(json.dumps(payload))
        await self.send(json.dumps({"message": f"{stock_code} {tr_id} Tracking started"}))