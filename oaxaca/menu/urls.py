from django.urls import path, include
from .views import DishApiView

urlpatterns = [
    path('api', DishApiView.as_view()),
]