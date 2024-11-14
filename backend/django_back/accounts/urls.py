from django.urls import path,include
from . import views

urlpatterns = [
    path('',include('dj_rest_auth.urls')),
    path('signup/',include('dj_rest_auth.registration.urls')),
    # path('logout/',views.logout),
    path('social/',include('allauth.socialaccount.urls')),
    path('favorite-stock/', views.favorite_stock),    
]
