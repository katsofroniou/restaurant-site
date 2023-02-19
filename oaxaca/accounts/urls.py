from django.conf.urls import include
from django.urls import path

accounts_urlpatterns = [
    path(r'^api/v1/', include('djoser.urls')),
    path(r'^api/v1/', include('djoser.urls.authtoken')),
]