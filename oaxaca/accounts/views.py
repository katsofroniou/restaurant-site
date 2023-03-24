from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User

class UserCreate(APIView):
    # Allows everyone to use safe api options - GET, HEAD, OPTIONS
    # Allows authenticated users to use unsafe api options - POST, DELETE, PUT
    permission_classes = [permissions.IsAuthenticated]
    
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
     
class UserDetailApiView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get_object(self, userId, *args, **kwargs):
        try:
            return User.objects.get(id=userId)
        except:
            return None
        
    def get(self, request, userId, *args, **kwargs):
        user = self.get_object(userId)
        
        if not user:
            return Response (
                {"res": "User with this id does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
         
    def delete(self, request, userId, *args, **kwargs):
        user_instance = self.get_object(userId)
        
        if not user_instance:
            return Response(
                {"res": "User with this id does not exist"},
                status=status.HTTP_400_BAD_REQUEST   
            )
        
        user_instance.delete()
        return Response(
            {"res": "User deleted!"},
            status=status.HTTP_200_OK
        )