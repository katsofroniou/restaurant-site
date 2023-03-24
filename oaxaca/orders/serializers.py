from rest_framework import serializers
from .models import Order, OrderDish

class OrderSerializer(serializers.ModelSerializer):
    """
    Serializes Order model instances to JSON format.

    Fields:
        - id (IntegerField): The unique identifier of the order.
        - orderTime (TimeField): The time that the order was placed.
        - tableNumber (IntegerField): The table number that the order is associated with.
        - items (ManyToManyField): A reference to the Dish model, representing the dishes ordered in the order.
        - confirmed (BooleanField): Indicates if the order has been confirmed.
        - orderReady (BooleanField): Indicates if the order is ready to be served.
        - OrderComplete (BooleanField): Indicates if the order is completed.
    """
    class Meta:
        model = Order
        fields = ["id", "orderTime", "tableNumber", "items", "confirmed", "orderReady", "OrderComplete"]
        
class OrderDishSerializer(serializers.ModelSerializer):
    """
    Serializes OrderDish model instances to JSON format.

    Fields:
        - id (IntegerField): The unique identifier of the order-dish relationship.
        - order (ForeignKey): A reference to the Order model, representing the order that the dish was a part of.
        - dish (ForeignKey): A reference to the Dish model, representing the dish that was ordered.
        - quantity (IntegerField): The quantity of the dish that was ordered.
    """
    class Meta:
        model = OrderDish
        fields = ['id', 'order', 'dish', 'quantity']