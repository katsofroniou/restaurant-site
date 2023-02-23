from django.urls import path
from .views import DishApiView, DishDetailApiView, FilterMenuAPIView

urlpatterns = [
    path('api', DishApiView.as_view()),
    path('api/<dishVal>/', DishDetailApiView.as_view()),
    path('api/filter/', FilterMenuAPIView.as_view()),
]