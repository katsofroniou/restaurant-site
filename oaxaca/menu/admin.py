from django.contrib import admin
from .models import Dish, Allergen

# Register your models here.
admin.site.register(Dish)
admin.site.register(Allergen)