from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
class StockData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_code = models.CharField(max_length=10)
    amount = models.IntegerField()
    price = models.IntegerField()
    order_number = models.CharField(max_length=10)
    execution_date = models.DateField()
    execution_time = models.TimeField()
    remain_amount = models.IntegerField()
    order_type = models.CharField(max_length=5, default="00")  # 00: 지정가, 01: 시장가