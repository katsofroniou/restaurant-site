from django.urls import path
from .views import OrderApiView, OrderDetailApiView

urlpatterns = [
    # Creates OrderApi as a viewable page
    path('api', OrderApiView.as_view()),
    # Creates OrderDetailApi as a viewable page
    # <OrderVal> is replaced with order name to only get that order's details
    path('api/<OrderVal>/', OrderDetailApiView.as_view())
]