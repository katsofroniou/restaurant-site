from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from notification.consumers import NotificationConsumer

websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', NotificationConsumer.as_asgi())
]

# the websocket will open at 127.0.0.1:8000/ws/
