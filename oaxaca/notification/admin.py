"""
Registers the Notification model with the Django admin site so that notifications can be managed through the admin interface.

Models:
    - Notification: Represents a notification that can be sent to users.

Args:
    - admin: Django's built-in admin module for managing models in the admin interface.
"""

from django.contrib import admin
from .models import Notification

# Register your models here.
admin.site.register(Notification)