from django.db import models
from menu.models import Dish

# defines Order table in database
class Order(models.Model):
    orderTime = models.TimeField(auto_now_add=True)
    tableNumber = models.IntegerField(default="0")
    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(help_text="True / False")
    orderReady = models.BooleanField(help_text="True / False")
    orderDelivered = models.BooleanField(help_text="True / False")
    OrderComplete = models.BooleanField(help_text="True / False")
    
    def __str__(self):
        return f"{self.orderTime.strftime('%H-%M-%S')}"

class Meta:
    # orders orders by the order time
    ordering = ['orderTime']
