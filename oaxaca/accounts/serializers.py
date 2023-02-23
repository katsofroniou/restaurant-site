from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

VALID_GROUPS = ["Kitchen Staff", "Waiter", "Customer"]

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    username = serializers.CharField (
            required=True,
            max_length=25,
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    password = serializers.CharField(min_length=8, write_only=True)
    
    group = group = serializers.CharField(required=True)
    
    def validate_group(self, value):
        if value not in VALID_GROUPS:
            raise serializers.ValidationError("Invalid group. Valid groups are: {}".format(", ".join(VALID_GROUPS)))
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'group')
