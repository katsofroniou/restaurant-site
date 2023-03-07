from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import path
from notification.consumers import NotificationConsumer

websocket_urlpatterns = [
    path("", NotificationConsumer.as_asgi())
]

# the websocket will open at 127.0.0.1:8000/ws/
