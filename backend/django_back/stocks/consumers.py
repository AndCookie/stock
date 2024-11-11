import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
import websockets


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

        if not self.channel_name in KISWebSocketConsumer.tasks:
            KISWebSocketConsumer.tasks[self.channel_name] = set()  # 클라이언트별 종목 목록 초기화

        if exit_request:
            # 특정 종목 추적 중단 요청
            if stock_code in KISWebSocketConsumer.tasks[self.channel_name]:
                KISWebSocketConsumer.tasks[self.channel_name].remove(stock_code)
                payload = {
                    "header": {
                        "approval_key": settings.REAL_APPROVAL_KEY,
                        "custtype": "P",
                        "tr_type": "2",  # 구독 해제
                        "content-type": "utf-8",
                    },
                    "body": {
                        "input": {"tr_id": "H0STCNT0", "tr_key": stock_code},
                    },
                }
                await KISWebSocketConsumer.kis_socket.send(json.dumps(payload))
                await self.send(json.dumps({"message": f"{stock_code} Tracking stopped"}))
                print(f"Tracking stopped for {stock_code} by client: {self.channel_name}")
            return

        if stock_code:
            # 새로운 종목 추적 요청
            KISWebSocketConsumer.tasks[self.channel_name].add(stock_code)
            await self.send(json.dumps({"message": f"{stock_code} Tracking started"}))
            print(f"Tracking started for {stock_code} by client: {self.channel_name}")

            if KISWebSocketConsumer.kis_socket:
                payload = {
                    "header": {
                        "approval_key": settings.REAL_APPROVAL_KEY,
                        "custtype": "P",
                        "tr_type": "1",  # 구독 시작
                        "content-type": "utf-8",
                    },
                    "body": {
                        "input": {"tr_id": "H0STCNT0", "tr_key": stock_code},
                    },
                }
                await KISWebSocketConsumer.kis_socket.send(json.dumps(payload))

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
                    print("send_data:", json.dumps(data))
                    # 각 클라이언트의 구독 목록 확인 후 데이터 전송
                    for channel_name, stock_codes in KISWebSocketConsumer.tasks.items():
                        if data.get("stock_code") in stock_codes:
                            await self.channel_layer.send(
                                channel_name,
                                {"type": "send_stock_data", "data": data},
                            )
        except Exception as e:
            print(f"KIS WebSocket connection error: {e}")
            KISWebSocketConsumer.kis_socket = None

    async def send_stock_data(self, event):
        await self.send(json.dumps(event["data"]))

    def parse_kis_data(self, message):
        try:
            parts = message.split("|")
            if len(parts) >= 4:
                result = self.stock_purchase(parts[3])
                return result
            return {}
        except Exception as e:
            print(f"Error parsing KIS data: {e}")
            return {}

    def stock_purchase(self, data):
        pValue = data.split('^')
        ret = {
            'stock_code': pValue[0],          # 종목 코드
            'STCK_CNTG_HOUR': pValue[1],     # 주식 체결 시간 (예: HHMMSS)
            'STCK_PRPR': pValue[2],          # 주식 현재가
            'CNTG_VOL': pValue[12],          # 체결 거래량
            'ACML_VOL': pValue[13],          # 누적 거래량
            'CTTR': pValue[18],              # 체결 강도 (매수/매도 비율)
            'CCLD_DVSN': pValue[21],         # 체결 구분 (매수: 1, 매도: 5)
        }
        return ret
