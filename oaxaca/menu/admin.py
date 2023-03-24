"""
Registers Django models with the admin site so that they can be managed through the admin interface.

Models:
    - Dish: Represents a dish in the restaurant menu.
    - Allergen: Represents a potential allergen in a dish.

Args:
    - admin: Django's built-in admin module for managing models in the admin interface.
"""

from django.contrib import admin
from .models import Dish, Allergen

admin.site.register(Dish)
admin.site.register(Allergen)