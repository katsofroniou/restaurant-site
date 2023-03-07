import json
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from django.core import serializers
from notification.models import Notification

class NotificationConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None

    def connect(self):
        print("Connected!")
        self.room_name = "home"
        self.accept()
        self.send_json(
            {
                "type": "welcome_message",
                "message": "Hey there! You've successfully connected!",
            }
        )

    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        # Receive message from WebSocket
        print(content)
        return super().receive_json(content, **kwargs)

    def notify(self, event):
        # Send notification to client
        notification = Notification.objects.get(id=event['id'])
        serialized_notification = serializers.serialize('json', [notification])
        self.send(text_data=serialized_notification)
