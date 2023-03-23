"""
ASGI config for oaxaca project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from asgiref.sync import sync_to_async
from django.core.asgi import get_asgi_application
from oaxaca.routing import websocket_urlpatterns


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# Define the ASGI application using a ProtocolTypeRouter that maps "http" and "websocket" protocols to their respective handlers
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter(websocket_urlpatterns),
    # Handle WebSocket requests using the URL routing defined in the "websocket_urlpatterns" list
    
    
})