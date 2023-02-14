from django.db import models
from menu.models import Dish

#database for storing orders
class Order(models.Model):
    BOOLEAN_CHOICES = [
        (True, 'Yes'),
        (False, 'No'),
    ]

    items = models.ManyToManyField(Dish)
    confirmed = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes / No")
    
    def __str__(self):
        return self.name


class Meta:
    ordering = ['id']