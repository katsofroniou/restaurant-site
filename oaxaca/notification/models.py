"""
This model represents a notification sent from one user to another in the system.
It contains information about the sender, the recipient, the notification message, 
and the time the notification was sent.

Attributes:
    - sender: The user who sent the notification.
    - recipient: The user who received the notification.
    - message: The message contained in the notification.
    - time: The time the notification was sent.

Methods:
    - str: Returns a string representation of the notification in the format '{sender} to {recipient}: {message}'.
"""

from django.db import models
from django.contrib.auth.models import User


class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_notifications')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} to {self.recipient}: {self.message}'
