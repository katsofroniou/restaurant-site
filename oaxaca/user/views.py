from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import User
from .serializers import UserSerializer

class UserApiView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        users = User.objects
        serializer = UserSerializer(users, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'permissions': request.data.get('permissions'),
            'login': request.data.get('login')
        }
        
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserDetailApiView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get_object(self, user, *args, **kwargs):
        try:
            return User.objects.get(user=user)
        except:
            return None
        
    def get(self, user, *args, **kwargs):
        user_instance = self.get_object(user)
        
        if not user_instance:
            return Response(
                {"res": "User does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, user, *args, **kwargs):
        user_instance = self.get_object(user)
        
        if not user_instance:
            return Response(
                {"res": "User does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = {
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'permissions': request.data.get('permissions'),
            'login': request.data.get('login')
        }
        
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, user, *args, **kwargs):
        user_instance = self.get_object(user)
        
        if not user_instance:
            return Response(
                {"res": "User does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        user_instance.delete()
        return Response(
            {"res": "User deleted!"},
            status=status.HTTP_200_OK
        )