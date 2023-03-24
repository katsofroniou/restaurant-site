"""
Defines a URL pattern for WebSocket connections and maps it to a NotificationConsumer instance.

Parameters:
- `room_name`: A string representing the name of the room to connect to.

Returns:
An instance of the NotificationConsumer class that handles WebSocket connections.
"""

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from notification.consumers import NotificationConsumer

# Define URL pattern for the websocket connections
websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', NotificationConsumer.as_asgi())
]

