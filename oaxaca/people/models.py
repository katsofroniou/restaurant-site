from django.db import models

# Create your models here.
class People(models.Model):
    username = models.CharField(null=False, primary_key=True, max_length=255)
    first_name = models.CharField(null=False, max_length=25)
    last_name = models.CharField(null=False, max_length=255)
    email = models.EmailField(null=False)
    
    def __str__(self):
        return self.username
    
class Meta:
    people = ['username']