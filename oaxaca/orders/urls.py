"""
URL patterns for the 'orders' Django app.

This list defines the URL patterns for the 'orders' app, mapping URLs to views that handle HTTP requests and return responses.

URL patterns:
    - /api - Retrieves all orders from the database and returns their details
    - /api/<dishVal> - Retrieves the details of a specific order from the database and returns them

Parameters:
    - OrderVal (int) - The id of the order to retrieve
"""

from django.urls import path
from .views import OrderApiView, OrderDetailApiView, OrderDishApiView

urlpatterns = [
    # Creates OrderApi as a viewable page
    path('api', OrderApiView.as_view()),
    path('api/<OrderVal>/', OrderDetailApiView.as_view()),
    path('orderDish/', OrderDishApiView.as_view())
]