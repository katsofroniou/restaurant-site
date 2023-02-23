from django.urls import path
from .views import UserCreate

urlpatterns = [
    path('api', UserCreate.as_view(), name='account-create'),
]
