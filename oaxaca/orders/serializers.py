from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    # Allows serialization of Order objects into JSON format
    class Meta:
        model = Order
        fields = ["id", "orderTime", "tableNumber", "items", "confirmed", "orderReady", "orderDelivered", "OrderComplete"]