from django.db import models

class User(models.Model):
    PERMISSION_CHOICES = [
        ("customer_permissions","customer_permissions"),
        ("waiter_permissions","waiter_permissions"),
        ("kitchen_permissions","kitchen_permissions")
    ]
    
    username = models.ForeignKey("People.model", on_delete=models.CASCADE, primary_key=True)
    password = models.CharField(help_text="password", null=False)
    permissions = models.CharField(choices=PERMISSION_CHOICES, null=False)
    login = models.BooleanField()
    
    def __str__(self):
        return self.username
    
class Meta:
    user = ['username']