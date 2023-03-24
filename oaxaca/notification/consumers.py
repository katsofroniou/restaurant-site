"""
Consumer that handles WebSocket connections and notifications between clients.

This class is responsible for handling WebSocket connections between 
clients and the server, and for broadcasting notifications to all 
clients subscribed to the corresponding group.

Attributes:
    - room_name: The name of the room the client is connected to.
    - room_group_name: The name of the group the client is subscribed to.

Methods:
    - connect: Called when a client connects to the WebSocket. Adds the client to the notification group and accepts the connection.
    - disconnect: Called when a client disconnects from the WebSocket. Removes the client from the notification group.
    - receive: Called when the client sends a notification to the server. Sends the notification to all clients in the corresponding group.
    - notify: Called when a notification is sent to the group. Sends the notification to the client.
"""

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class NotificationConsumer(WebsocketConsumer):

    # Called when a client connects to the websocket
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Add the client to the notification group
        # This allows us to send notifications to different groups.
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )  


    def receive(self, text_data):
        # Called when the client sends a notification to the server
        # Deserialize the json data
        text_data_json = json.loads(text_data)
        text = text_data_json['text']
        sender = text_data_json['sender']
        # Send message to coressponding group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'notify',
                'message': text,
                'sender': sender
            }
        )


    def notify(self, event):
        # Called when notification is sent to client
        text = event['message']
        sender = event['sender']

        # Send message to client
        self.send(text_data=json.dumps({
            'text': text,
            'sender': sender
        }))
        
        

