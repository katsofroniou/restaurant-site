from django.urls import path
from .views import OrderApiView, OrderDetailApiView

urlpatterns = [
    path('api', OrderApiView.as_view()),
    path('api/<orderVal>/', OrderDetailApiView.as_view())
]