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
