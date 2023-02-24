from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User, Group

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
    
    group = serializers.CharField(default='Customer')
    
    def validate_group(self, value):
        if value not in VALID_GROUPS:
            raise serializers.ValidationError("Invalid group. Valid groups are: {}".format(", ".join(VALID_GROUPS)))
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        
        group_name = validated_data['group']
        group = Group.objects.get(name=group_name)
        user.groups.add(group)
        
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'group')
