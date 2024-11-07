import json
import redis
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

class StockPriceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # 클라이언트가 "stock_data_group" 그룹에 가입
        await self.channel_layer.group_add("stock_data_group", self.channel_name)
        await self.accept()
        
        await self.send(text_data=json.dumps({"message": "WebSocket connection established"}))
        print("WebSocket connection established")

    async def disconnect(self, close_code):
        # 클라이언트가 그룹에서 나감
        await self.channel_layer.group_discard("stock_data_group", self.channel_name)
        print("WebSocket connection closed")

    async def receive(self, text_data):
        # 클라이언트로부터 종목 코드 수신
        data = json.loads(text_data)
        stock_code = data.get("stock_code")
        
        if stock_code:
            # Redis에서 해당 종목 코드에 대한 데이터 조회
            redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
            stock_data = redis_client.get(f"stock_data:{stock_code}")
            
            if stock_data:
                await self.send(text_data=stock_data)
            else:
                await self.send(text_data=json.dumps({"error": f"No data found for stock code: {stock_code}"}))

    async def send_stock_data(self, event):
        # 채널 그룹을 통해 받은 데이터를 클라이언트에 전송
        await self.send(text_data=json.dumps(event["data"]))
