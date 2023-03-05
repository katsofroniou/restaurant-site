import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core import serializers
from notification.models import Notification

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'notifications'

        # Join notification group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave notification group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def receive(self, text_data):
        # Handle incoming websocket messages (not used in this example)
        pass

    def notify(self, event):
        # Send notification to client
        notification = Notification.objects.get(id=event['id'])
        serialized_notification = serializers.serialize('json', [notification])
        self.send(text_data=serialized_notification)
