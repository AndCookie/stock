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
        if self.channel_name in KISWebSocketConsumer.tasks:
            del KISWebSocketConsumer.tasks[self.channel_name]
        print(f"Disconnected client: {self.channel_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        stock_code = data.get("stock_code")
        print(f"{stock_code} data received")

        if stock_code:  # 연결 끝내는 코드도 만들어줘야함
            # 클라이언트 요청 종목코드 추적
            KISWebSocketConsumer.tasks[self.channel_name] = stock_code

            # KIS로 종목코드 요청 전송
            if KISWebSocketConsumer.kis_socket:
                payload = {
                    "header": {
                        "approval_key": settings.REAL_APPROVAL_KEY,
                        "custtype": "P",
                        "tr_type": "1",
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

                    for channel_name, stock_code in KISWebSocketConsumer.tasks.items():
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
        menustr = "유가증권단축종목코드|주식체결시간|주식현재가|전일대비부호|전일대비|전일대비율|가중평균주식가격|주식시가|주식최고가|주식최저가|매도호가1|매수호가1|체결거래량|누적거래량|누적거래대금|매도체결건수|매수체결건수|순매수체결건수|체결강도|총매도수량|총매수수량|체결구분|매수비율|전일거래량대비등락율|시가시간|시가대비구분|시가대비|최고가시간|고가대비구분|고가대비|최저가시간|저가대비구분|저가대비|영업일자|신장운영구분코드|거래정지여부|매도호가잔량|매수호가잔량|총매도호가잔량|총매수호가잔량|거래량회전율|전일동시간누적거래량|전일동시간누적거래량비율|시간구분코드|임의종료구분코드|정적VI발동기준가"
        menulist = menustr.split('|')
        pValue = data.split('^')
        ret = {}
        for i in range(len(menulist)):
            if menulist[i] == "주식체결시간":
                ret['STCK_CNTG_HOUR'] = pValue[i]
            elif menulist[i] == "주식현재가":
                ret['STCK_PRPR'] = pValue[i]
            elif menulist[i] == "체결거래량":
                ret['CNTG_VOL'] = pValue[i]
            elif menulist[i] == "체결강도":
                ret['ACML_VOL'] = pValue[i]
            elif menulist[i] == "주식체결시간":
                ret['CTTR'] = pValue[i]
            elif menulist[i] == "체결구분":
                ret['CCLD_DVSN'] = pValue[i]
        return ret