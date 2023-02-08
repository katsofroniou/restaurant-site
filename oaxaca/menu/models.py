from django.db import models
from django.urls import reverse

class Allergens(models.Model):
    ALLERGENS_CHOICES = [
        ('DR', 'Dairy'),
        ('GL', 'Gluten'),
        ('EG', 'Eggs'),
        ('FS', 'Fish'),
        ('CS', 'Crustacean shellfish'),
        ('TN', 'Tree nuts'),
        ('PN', 'Peanuts'),
        ('WH', 'Wheat'),
        ('SB', 'Soybeans'),
    ]
    
    allergen = models.CharField(max_length=50, help_text="Enter the allergen", choices=ALLERGENS_CHOICES, blank=True)

class Dishes(models.Model):
    BOOLEAN_CHOICES = [
        ('Y', 'Yes'),
        ('N', 'No'),
    ]
    
    name = models.CharField(max_length=100, help_text="Enter the item's name")
    description = models.CharField(max_length=500, help_text="Write a description of the item")
    allergens = models.ManyToManyField(Allergens, blank=True)
    kcal = models.IntegerField(help_text="Enter the calories of this item")
    course = models.CharField(max_length=25, help_text="What course this item is for")
    price = models.FloatField(help_text="How much does this item cost?")
    vegetarian = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Is this item vegetarian?")
    vegan = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Is this item vegan?")
    available = models.BooleanField(choices=BOOLEAN_CHOICES, help_text= "Is this item in stock" )
    
class Logins(models.Model):
    email = models.EmailField(help_text="Enter an email")
    first_name = models.CharField(max_length=50, help_text="Enter first name")
    last_name = models.CharField(max_length=50, help_text="Enter surname")
    username = models.CharField(max_length=15, help_text="Enter a username")
    password = models.CharField(max_length=20, help_text="Enter a password")

class Meta:
    ordering = ['id']