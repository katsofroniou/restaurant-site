from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User, Group

# Sets valid groups for user permissions
VALID_GROUPS = ["Kitchen Staff", "Waiter", "Customer"]

class UserSerializer(serializers.ModelSerializer):
    # Ensures the email is in a valid format
    email = serializers.EmailField(
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    # Validates the username so it's not too long or null
    username = serializers.CharField (
            required=True,
            max_length=25,
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    # Ensures you have a long enough password
    # Password is write only and can't be read
    password = serializers.CharField(min_length=8, write_only=True)
    
    # Default group setting is Customer
    # Ensures no one accidentally gets staff permissions
    group = serializers.CharField(default='Customer')
    
    # Checks whether the the group entered is valid
    def validate_group(self, value):
        if value not in VALID_GROUPS:
            raise serializers.ValidationError("Invalid group. Valid groups are: {}".format(", ".join(VALID_GROUPS)))
        return value
    
    def create(self, validated_data):
        # Creates user with username, password and email
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        
        # Adds validated group to user
        group_name = validated_data['group']
        group = Group.objects.get(name=group_name)
        user.groups.add(group)
        
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'group')
