from django.contrib import admin
from .models import Dishes, Logins, Allergens

# Register your models here.
admin.site.register(Dishes)
admin.site.register(Allergens)