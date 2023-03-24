"""
URL patterns for the 'menu' Django app.

This list defines the URL patterns for the 'menu' app, mapping URLs to views that handle HTTP requests and return responses.

URL patterns:
    - /api - Retrieves all dishes from the database and returns their details
    - /api/<dishVal> - Retrieves the details of a specific dish from the database and returns them

Parameters:
    - dishVal (int) - The id of the dish to retrieve
"""

from django.urls import path
from .views import DishApiView, DishDetailApiView

urlpatterns = [
    # Creates DishApi as a viewable page
    path('api', DishApiView.as_view()),
    
    # Creates DishDetailApi as a viewable page
    # <dishVal> is replaced with dish name to get only that dish's details
    path('api/<dishVal>/', DishDetailApiView.as_view()),
]