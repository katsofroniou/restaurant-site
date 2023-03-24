"""
Serializers for the User model.

This module contains the UserSerializer class, which is used to serialize User objects for the API.

Classes:
    - UserSerializer - Serializer for the User model.

Variables:
    - VALID_GROUPS - A list of valid group names for user permissions.

"""

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User, Group

"""Sets valid groups for user permissions"""
VALID_GROUPS = ["Kitchen Staff", "Waiter", "Customer"]

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.

    This serializer is used to serialize User objects for the API. It includes validation for the email,
    username, and group fields, and also creates new users with the specified username, email, password,
    and group.

    Methods:
        - validate_group - Validates the group field to ensure it is one of the valid groups.
        - create - Creates a new user with the specified username, email, password, and group.

    Attributes:
        - email - Email field that ensures the email is in a valid format.
        - username - Username field that validates the username so it's not too long or null.
        - password - Password field that ensures you have a long enough password and is write only.
        - group - Group field that sets the default group to Customer and ensures no one accidentally gets
        staff permissions.
    """
    
    email = serializers.EmailField(
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    username = serializers.CharField (
            required=True,
            max_length=25,
            validators=[UniqueValidator(queryset=User.objects.all())]
    )
    
    password = serializers.CharField(min_length=8, write_only=True)
    
    group = serializers.CharField(default='Customer')
    
    def validate_group(self, value):
        """
        Validates the group field to ensure it is one of the valid groups.

        Arguments:
            - value - The value of the group field to be validated.

        Returns:
            - The validated value of the group field.

        Raises:
            - serializers.ValidationError - If the value of the group field is not one of the valid groups.
        """
        if value not in VALID_GROUPS:
            raise serializers.ValidationError("Invalid group. Valid groups are: {}".format(", ".join(VALID_GROUPS)))
        return value
    
    def create(self, validated_data):
        """
        Creates a new user with the specified username, email, password, and group.

        Arguments:
            - validated_data - A dictionary containing the validated data for the new user.

        Returns:
            - The newly created User object.
        """
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        
        group_name = validated_data['group']
        group = Group.objects.get(name=group_name)
        user.groups.add(group)
        
        return user

    class Meta:
        """
        Specifies the model and fields to use for the serializer.

        Attributes:
            - model - The model to use for the serializer.
        
            - fields - The fields to include in the serialized representation of the model.
        """
        model = User
        fields = ('id', 'username', 'email', 'password', 'group')
