from django.db import models

# Defines allergens table in database
class Allergen(models.Model):
    # Creates choices for allergens field
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
    
    # Creates allergen column in table
    allergen = models.CharField(max_length=50, choices=ALLERGENS_CHOICES, blank=True, primary_key=True)

    def __str__(self):
        return self.allergen

# Defines Dish table in database
class Dish(models.Model):
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
        return self.name
    
class Meta:
    # Orders dishes by their id
    ordering = ['id']