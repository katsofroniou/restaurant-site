"""
ASGI config for oaxaca project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from asgiref.sync import sync_to_async
from django.core.asgi import get_asgi_application
from notification.routing import websocket_urlpatterns
import settings as settings


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oaxaca.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket":URLRouter(websocket_urlpatterns)
    
    
    
})