from .serializers import UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import FavoriteStock
import os

state = os.environ.get("STATE")
BASE_URL = 'http://localhost:8000/api/accounts/'
GOOGLE_CALLBACK_URI = BASE_URL + 'social/login/'

def google_login(request):
    return


def google_logout(request):
    return


def google_signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            
        # jwt 토큰 => 쿠키에 저장
        res.set_cookie("access", access_token, httponly=True)
        res.set_cookie("refresh", refresh_token, httponly=True)
        
        return res
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def favorite_stock(request):
    if request.method == 'GET':
        user = request.user
        favorite_stocks = FavoriteStock.objects.filter(user=user)
        stock_codes = [stock.stock_code for stock in favorite_stocks]
        return Response(stock_codes, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        user = request.user
        stock_code = request.data.get('stock_code')

        if not stock_code:
            return Response({"error": "Stock code is required."}, status=status.HTTP_400_BAD_REQUEST)

        favorite, created = FavoriteStock.objects.get_or_create(user=user, stock_code=stock_code)

        if created:
            return Response({"message": "Stock added to favorites."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Stock is already in favorites."}, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        user = request.user
        stock_code = request.data.get('stock_code')
        
        if not stock_code:
            return Response({"error": "Stock code is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            stock = FavoriteStock.objects.get(user=user, stock_code=stock_code)
            stock.delete()
            return Response({"message": f"Stock {stock_code} removed from favorites."}, status=status.HTTP_204_NO_CONTENT)
        except FavoriteStock.DoesNotExist:
            return Response({"error": f"Stock {stock_code} is not in favorites."}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
def order(request):
    # 가격, 종목코드, 개수
    pass