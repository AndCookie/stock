from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
class StockData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_code = models.CharField(max_length=10)
    execution_time = models.DateTimeField()  # 체결 시간
    value = models.IntegerField()

    def __str__(self):
        return f"{self.stock_code} - {self.execution_time} - {self.value}"
