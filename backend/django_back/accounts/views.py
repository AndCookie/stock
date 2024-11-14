from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import FavoriteStock, Balance
import os

state = os.environ.get("STATE")
BASE_URL = 'http://localhost:8000/api/accounts/'

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def balance(request):
    user = request.user
    try:
        balance = Balance.objects.get(user=user)
    except:
        balance = Balance.objects.create(user=user, balance=5000000)
    return Response({"balance": balance.balance}, status=status.HTTP_200_OK)