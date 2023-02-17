from django.urls import path
from .views import OrderReadyView
from .views import CallWaiterView
from .views import WaiterCancelOrderView

urlpatterns = [
path('order-ready/', OrderReadyView.as_view(), name='order_ready'),
]
urlpatterns = [
path('call-waiter/', CallWaiterView.as_view(), name='call_waiter'),
]
urlpatters.append(
    path('cancel_order', WaiterCancelOrderView.as_view(), name = 'cancel_order'),
)
