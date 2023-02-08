from django.contrib import admin
from .models import Dishes, Allergens

# Register your models here.
admin.site.register(Dishes)
admin.site.register(Allergens)