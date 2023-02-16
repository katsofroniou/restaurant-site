from django.db import models

class User(models.Model):
    username = models.CharField(max_length=20, help_text="jdoe", unique=True, primary_key=True)
    first_name = models.CharField(help_text="John")
    email = models.EmailField(help_text="email@example.com")
    
    def __str__(self):
        return self.username
    
class Meta:
    user = ['username']