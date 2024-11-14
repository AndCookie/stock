from rest_framework import serializers
from .models import StockData

class StockDataSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ['user', 'stock_code', 'amount', 'price', 'order_number', 'execution_date', 'execution_time', "remain_amount", 'order_type']
        
class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ['user', 'stock_code', 'amount', 'price', 'order_number', 'execution_date', 'execution_time', "remain_amount"]
