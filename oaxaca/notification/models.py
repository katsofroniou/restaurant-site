from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_notifications')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} to {self.recipient}: {self.message}'
