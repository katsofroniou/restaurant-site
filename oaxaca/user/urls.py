from django.urls import path
from .views import UserApiView, UserDetailApiView

urlpatterns = [
    path('api', UserApiView.as_view()),
    path('api/<username>/', UserDetailApiView.as_view())
]
