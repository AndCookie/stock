from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
class StockData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_code = models.CharField(max_length=10)
    amount = models.IntegerField()
    price = models.IntegerField()
    execution_date = models.DateField()
    execution_time = models.TimeField()
