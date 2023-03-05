from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.username')
    recipient = serializers.CharField(source='recipient.username')
    message = serializers.CharField()
    time = serializers.DateTimeField()

    class Meta:
        model = Notification
        fields = ["sender","recipient","message","time"]