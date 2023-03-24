from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User

class UserCreate(APIView):
    """
    API View to create a new user or retrieve a list of existing users.
    
    Permissions:
        - Everyone can use safe API options (GET, HEAD, OPTIONS).
        - Authenticated users can use unsafe API options (POST, DELETE, PUT).
        
    Methods:
        - post: Creates a new user.
        - get: Retrieves a list of all users.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        user = User.objects
        serializer = UserSerializer(user, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)