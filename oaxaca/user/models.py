from django.db import models

class User(models.Model):
    BOOLEAN_CHOICES = [
        (True, 'Yes'),
        (False, 'No'),
    ]
    
    first_name = models.CharField(max_length=50, help_text="John")
    last_name = models.CharField(max_length=75, help_text="Doe")
    username = models.CharField(max_length=20, help_text="jdoe", unique=True, primary_key=True)
    password = models.CharField(max_length=15, help_text="Johnpassword!")
    waiter_permissions = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes or No")
    kitchen_permissions = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes or No") 
    admin_permissions = models.BooleanField(choices=BOOLEAN_CHOICES, help_text="Yes or No") 
    email = models.EmailField(help_text="example@oaxaca.com", unique=True)
    
    def __str__(self):
        return self.username
    
class Meta:
    user = ['username']