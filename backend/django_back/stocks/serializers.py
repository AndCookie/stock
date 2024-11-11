from rest_framework import serializers
from .models import StockData

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ['user', 'stock_code', 'amount', 'value', 'execution_date', 'execution_time']
