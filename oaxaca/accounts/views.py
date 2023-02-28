from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User

class UserCreate(APIView):
    # Allows everyone to use safe api options - GET, HEAD, OPTIONS
    # Allows authenticated users to use unsafe api options - POST, DELETE, PUT
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    # Post api to create new user
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        
        # Saves user to database if it is valid otherwise returns an error
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        user = User.objects
        serializer = UserSerializer(user, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)