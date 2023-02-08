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
    
    allergen = models.CharField(max_length=50, help_text="Enter the allergen", choices=ALLERGENS_CHOICES, blank=True)

    def __str__(self):
        return self.allergen

class Dish(models.Model):
    BOOLEAN_CHOICES = [
        (True, 'Yes'),
        (False, 'No'),
    ]
    
    name = models.CharField(max_length=100, help_text="Enter the item's name")
    description = models.CharField(max_length=500, help_text="Write a description of the item")
    allergens = models.ManyToManyField(Allergen, blank=True)
    kcal = models.IntegerField(help_text="Enter the calories of this item")
    course = models.CharField(max_length=25, help_text="What course this item is for")
    price = models.FloatField(help_text="How much does this item cost?")
    vegetarian = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Is this item vegetarian?")
    vegan = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Is this item vegan?")
    available = models.BooleanField(choices=BOOLEAN_CHOICES, help_text= "Is this item in stock" )
    
    def __str__(self):
        return self.name
    
class Meta:
    ordering = ['id']