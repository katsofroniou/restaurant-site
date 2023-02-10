from django.urls import path
from .views import DishApiView, DishDetailApiView

urlpatterns = [
    path('api', DishApiView.as_view()),
    path('api/<string:dishName>/', DishDetailApiView.as_view())
]