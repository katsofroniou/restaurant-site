from django.urls import path
from .views import PeopleApiView, PeopleDetailedApiView

urlpatterns = [
    path('api', PeopleApiView.as_view()),
    path('api/<username>', PeopleDetailedApiView.as_view())
]