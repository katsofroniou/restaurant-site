from rest_framework import serializers
from .models import Order, OrderDish

class OrderSerializer(serializers.ModelSerializer):
    # Allows serialization of Order objects into JSON format
    class Meta:
        model = Order
        fields = ["id", "orderTime", "tableNumber", "items", "confirmed", "orderReady", "OrderComplete"]
        
class OrderDishSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDish
        fields = ['id', 'order', 'dish', 'quantity']