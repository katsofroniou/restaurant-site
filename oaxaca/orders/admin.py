from django.contrib import admin
from .models import Order, OrderDish

# Register your models here.
admin.site.register(Order)
admin.site.register(OrderDish)