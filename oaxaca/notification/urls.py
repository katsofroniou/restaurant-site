from django.urls import path
from .views import NotificationApiView, NotificationDetailApiView

urlpatterns = [
    path('api', NotificationApiView.as_view()),
    path('api/<time>/', NotificationDetailApiView.as_view())

]