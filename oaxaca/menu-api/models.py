from django.db import models
from django.urls import reverse

class Allergen(models.Model):
    ALLERGENS_CHOICES = [
        ('Diary', 'Dairy'),
        ('Gluten', 'Gluten'),
        ('Egg', 'Eggs'),
        ('Fish', 'Fish'),
        ('Crustacean shellfish', 'Crustacean shellfish'),
        ('Tree nuts', 'Tree nuts'),
        ('Peanuts', 'Peanuts'),
        ('Wheat', 'Wheat'),
        ('Soybeans', 'Soybeans'),
    ]
    
    allergen = models.CharField(max_length=50, choices=ALLERGENS_CHOICES, blank=True)

    def __str__(self):
        return self.allergen

class Dish(models.Model):
    BOOLEAN_CHOICES = [
        (True, 'Yes'),
        (False, 'No'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    allergens = models.CharField(max_length=25, blank=True)
    kcal = models.IntegerField(help_text="e.g. 1200")
    course = models.CharField(max_length=25, help_text="Main, side, dessert, drink")
    price = models.FloatField(help_text="e.g. 2.99")
    vegetarian = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes / No")
    vegan = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes / No")
    available = models.BooleanField(choices=BOOLEAN_CHOICES, help_text= "Yes / No" )
    
    def __str__(self):
        return self.name
    
class Meta:
    ordering = ['id']