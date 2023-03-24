"""
Creates a new notification object and sends it to all clients 
subscribed to the 'notifications' channel group using Django Channels.

Args:
    - sender: The user who sent the notification.
    - receiver: The user who will receive the notification.
    - message: The content of the notification message.

Raises:
    - ValueError: If sender, receiver or message is not provided.

"""

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification

def send_notification(sender, receiver, message):
    # Create notification object
    notification = Notification.objects.create(sender=sender, receiver=receiver, message=message)

    # Broadcast notification to clients
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'notifications',
        {
            'type': 'notify',
            'id': notification.id
        }
    )