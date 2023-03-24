"""
Defines the models for orders and order dishes that will be used to create the corresponding tables in the database.

Models:
    - Order: Represents an order placed by a customer.
    - OrderDish: Represents a dish that has been ordered in an order.
"""

from django.db import models
from menu.models import Dish

# defines Order table in database
class Order(models.Model):
    """
    Attributes:
        - orderTime (TimeField): The time that the order was placed.
        - tableNumber (IntegerField): The table number that the order is associated with.
        - items (ManyToManyField): A reference to the Dish model, representing the dishes ordered in the order.
        - confirmed (BooleanField): Indicates if the order has been confirmed.
        - orderReady (BooleanField): Indicates if the order is ready to be served.
        - OrderComplete (BooleanField): Indicates if the order is completed.
        - orderDelivered (BooleanField): Indicates if the order has been delivered.
    """
    orderTime = models.TimeField(auto_now_add=True)
    tableNumber = models.IntegerField(default="0")
    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(help_text="True / False", default=False, null=True)
    orderReady = models.BooleanField(help_text="True / False", default=False, null=True)
    OrderComplete = models.BooleanField(help_text="True / False", default=False, null=True)
    orderDelivered = models.BooleanField(help_text="True / False", default=False, null=True)
    
    def __str__(self):
        return self.orderTime
    
class OrderDish(models.Model):
    """
    Attributes:
        - order (ForeignKey): A reference to the Order model, representing the order that the dish was a part of.
        - dish (ForeignKey): A reference to the Dish model, representing the dish that was ordered.
        - quantity (IntegerField): The quantity of the dish that was ordered.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

class Meta:
    # orders orders by the order time
    ordering = ['orderTime']
