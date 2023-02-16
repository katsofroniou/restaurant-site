from django.db import models

# Create your models here.
class People(models.Model):
    username = models.CharField(null=False, primary_key=True)
    first_name = models.CharField(null=False)
    last_name = models.CharField(null=False)
    email = models.EmailField(null=False)
    
    def __str__(self):
        return self.username
    
class Meta:
    people = ['username']