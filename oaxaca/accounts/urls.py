from django.urls import path
from .views import UserCreate

urlpatterns = [
    # Adds user create as an api view
    path('api', UserCreate.as_view(), name='account-create'),
]
