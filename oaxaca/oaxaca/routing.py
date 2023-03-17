from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from notification.consumers import NotificationConsumer

# Define URL pattern for the websocket connections
websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', NotificationConsumer.as_asgi())
]

