"""
Registers Django models with the admin site so that they can be managed through the admin interface.

Models:
    - Order: Represents a customer order in the restaurant.
    - OrderDish: Represents a dish included in a customer order.

Args:
    - admin: Django's built-in admin module for managing models in the admin interface.
"""

from django.contrib import admin
from .models import Order, OrderDish

# Register your models here.
admin.site.register(Order)
admin.site.register(OrderDish)