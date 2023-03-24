from rest_framework import serializers
from .models import Dish

"""Serializer class for the 'Dish' Django model.

    This serializer allows instances of the 'Dish' model to be serialized into JSON format for use in Django REST Framework (DRF) views.

    Attributes:
        - Meta (class): A nested class that defines the model and fields to be serialized.
        - model (Dish): The Django model to be serialized
        - fields (list): The fields to include in the serialized output
"""
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ["id", "name", "description", "allergens", "kcal", \
            "course", "price", "vegetarian", "vegan", "available"]