from django.urls import path
from .views import DishApiView, DishDetailApiView

urlpatterns = [
    # Creates DishApi as a viewable page
    path('api', DishApiView.as_view()),
    
    # Creates DishDetailApi as a viewable page
    # <dishVal> is replaced with dish name to get only that dish's details
    path('api/<dishVal>/', DishDetailApiView.as_view()),
]