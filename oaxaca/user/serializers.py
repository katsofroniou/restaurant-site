from rest_framework import serializers
from .models import User, People

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "permissions", "email"]
        
class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ["username", "first_name", "last_name", "email"]