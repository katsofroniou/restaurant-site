from django.db import models
from menu.models import Dish

#database for storing orders
class Order(models.Model):
    orderTime = models.DateTimeField(auto_now_add=True)
    tableNumber = models.IntegerField(default="0")
    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(help_text="True / False", default=False, null=True)
    orderReady = models.BooleanField(help_text="True / False", default=False, null=True)
    OrderComplete = models.BooleanField(help_text="True / False", default=False, null=True)
    orderDelivered = models.BooleanField(help_text="True / False", default=False, null=True)
    
    def __str__(self):
        return str(self.orderTime)
    
class OrderDish(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

class Meta:
    ordering = ['orderTime']