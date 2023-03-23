from django.urls import path
from .views import OrderApiView, OrderDetailApiView, OrderDishApiView

urlpatterns = [
    # Creates OrderApi as a viewable page
    path('api', OrderApiView.as_view()),
    path('api/<OrderVal>/', OrderDetailApiView.as_view()),
    path('orderDish/', OrderDishApiView.as_view())
]