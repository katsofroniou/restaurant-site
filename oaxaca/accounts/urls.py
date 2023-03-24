from django.urls import path
from .views import UserCreate, UserDetailApiView

urlpatterns = [
    # Adds user create as an api view
    path('api', UserCreate.as_view(), name='account-create'),
    path('api/<userId>', UserDetailApiView.as_view(), name='account')
]
