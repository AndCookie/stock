from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    pass

class FavoriteStock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_code = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)  # 관심 종목에 추가한 날짜

    class Meta:
        unique_together = ('user', 'stock_code')  # 사용자별로 종목이 중복되지 않도록 설정
        ordering = ['-created_at']  # 최근 추가한 순서로 정렬

    def __str__(self):
        return f"{self.user.username} - {self.stock_code}"