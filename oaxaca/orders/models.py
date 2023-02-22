from django.db import models
from menu.models import Dish

#database for storing orders
class Order(models.Model):
    orderTime = models.DateTimeField(auto_now_add=True)
    tableNumber = models.IntegerField(default="0")
    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(help_text="Yes / No")
    orderReady = models.BooleanField(help_text="Yes / No")
    
    def __str__(self):
        return str(self.orderTime)

class Meta:
    ordering = ['orderTime']