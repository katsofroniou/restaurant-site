from django.db import models

# Create your models here.
class People(models.Model):
    username = models.CharField(nullable=False, primary_key=True)
    first_name = models.CharField(nullable=False)
    last_name = models.CharField(nullable=False)
    email = models.EmailField(nullable=False)
    
    def __str__(self):
        return self.username
    
class Meta:
    people = ['username']