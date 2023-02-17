from django.urls import path
from .views import UserApiView, UserDetailApiView, PeopleApiView, PeopleDetailedApiView

urlpatterns = [
    path('api', UserApiView.as_view()),
    path('api/<username>/', UserDetailApiView.as_view()),
    path('person/api', PeopleApiView.as_view()),
    path('person/api/<username>', PeopleDetailedApiView.as_view())
]
