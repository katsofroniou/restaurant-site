from django.urls import path
from .views import OrderApiView, OrderDetailApiView

urlpatterns = [
    path('api', OrderApiView.as_view()),
    path('api/<OrderVal>/', OrderDetailApiView.as_view())
]