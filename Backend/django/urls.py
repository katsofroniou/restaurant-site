from django.urls import path
from .views import OrderReadyView
from .views import CallWaiterView

urlpatterns = [
path('order-ready/', OrderReadyView.as_view(), name='order_ready'),
]
urlpatterns = [
path('call-waiter/', CallWaiterView.as_view(), name='call_waiter'),
]