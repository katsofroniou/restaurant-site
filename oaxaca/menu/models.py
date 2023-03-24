from django.db import models

"""Models for the menu database.

Classes:
    - Allergen - Represents different food allergens.
    - Dish - Represents a dish on the restaurant menu.
"""

class Allergen(models.Model):
    """
    A model representing different food allergens.

    Attributes:
        - allergen (str): The name of the allergen.
    """
    ALLERGENS_CHOICES = [
        ('Dairy', 'Dairy'),
        ('Gluten', 'Gluten'),
        ('Egg', 'Eggs'),
        ('Fish', 'Fish'),
        ('Crustacean shellfish', 'Crustacean shellfish'),
        ('Tree nuts', 'Tree nuts'),
        ('Peanuts', 'Peanuts'),
        ('Wheat', 'Wheat'),
        ('Soybeans', 'Soybeans'),
        ('Celery', 'Celery'),
        ('Lupin', 'Lupin'),
        ('Sesame', 'Sesame'),
        ('Sulphites', 'Sulphites'),
        ('Molluscs', 'Molluscs'),
        ('Mustard', 'Mustard'),
    ]
    
    allergen = models.CharField(max_length=50, choices=ALLERGENS_CHOICES, blank=True, primary_key=True)

    def __str__(self):
        """Returns a string representation of the allergen."""
        return self.allergen

class Dish(models.Model):
    """
    A model representing a dish on the restaurant menu.

    Attributes:
        - name (str): The name of the dish.
        - description (str): A description of the dish.
        - allergens (ManyToManyField): A list of allergens associated with the dish.
        - kcal (int): The number of calories in the dish.
        - course (str): The course that the dish belongs to (e.g. "Main", "Side", "Dessert", "Drink").
        - price (float): The price of the dish.
        - vegetarian (bool): Whether the dish is vegetarian or not.
        - vegan (bool): Whether the dish is vegan or not.
        - available (bool): Whether the dish is currently available or not.
    """
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    allergens = models.ManyToManyField(Allergen, blank=True)
    kcal = models.IntegerField(help_text="e.g. 1200")
    course = models.CharField(max_length=25, help_text="Main, side, dessert, drink")
    price = models.FloatField(help_text="e.g. 2.99")
    vegetarian = models.BooleanField(help_text="True / False")
    vegan = models.BooleanField(help_text="True / False")
    available = models.BooleanField(help_text="True / False" )
    
    def __str__(self):
        """Returns the name of the dish"""
        return self.name
    
class Meta:
    """Orders dishes by their id"""
    ordering = ['id']