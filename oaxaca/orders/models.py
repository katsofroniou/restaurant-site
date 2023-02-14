from django.db import models
from menu.models import Dish

#database for storing orders
class Order(models.Model):
    BOOLEAN_CHOICES = [
        (True, 'Yes'),
        (False, 'No'),
    ]
    tableNumber = models.IntegerField()
    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes / No")
    
    def __str__(self):
        return self.tableNumber


class Meta:
    ordering = ['id']