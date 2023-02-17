from django.db import models

class People(models.Model):
    username = models.CharField(null=False, primary_key=True, max_length=255, unique=True)
    first_name = models.CharField(null=False, max_length=25)
    last_name = models.CharField(null=False, max_length=255)
    email = models.EmailField(null=False)
    
    def __str__(self):
        return self.username

class User(models.Model):
    PERMISSION_CHOICES = [
        ("customer_permissions","customer_permissions"),
        ("waiter_permissions","waiter_permissions"),
        ("kitchen_permissions","kitchen_permissions")
    ]
    
    username = models.OneToOneField(People, on_delete=models.CASCADE, primary_key=True)
    password = models.CharField(help_text="password", null=False, max_length=255, default="password")
    permissions = models.CharField(choices=PERMISSION_CHOICES, null=False, max_length=22, default="customer_permissions")
    login = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username
    
class Meta:
    user = ['username']
    people = ['username']