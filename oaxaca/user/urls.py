from django.urls import path
from .views import UserApiView, UserDetailApiView, PeopleApiView, PeopleDetailedApiView

urlpatterns = [
    path('user/api', UserApiView.as_view()),
    path('user/api/<username>/', UserDetailApiView.as_view()),
    path('people/api', PeopleApiView.as_view()),
    path('people/api/<username>', PeopleDetailedApiView.as_view())
]
