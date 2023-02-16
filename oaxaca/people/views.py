from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import People
from .serializers import PeopleSerializer

class PeopleApiView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        people = People.objects
        serializer = PeopleSerializer(people, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'username': request.data.get('username'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'email': request.data.get('email')
        }
        
        serializer = PeopleSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class PeopleDetailedApiView(APIView):
    permission_classes= [permissions.AllowAny]
    
    def get_object(self, people, *args, **kwargs):
        try:
            return People.objects.get(people=people)
        except:
            return None
        
    def get(self, people, *args, **kwargs):
        people_instance = self.get_object(people)
        
        if not people_instance:
            return Response(
                {"res": "Person does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        serializer = PeopleSerializer(people)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, people, *args, **kwargs):
        people_instance = self.get_object(people)
        
        if not people_instance:
            return Response(
                {"res": "Person does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        data = {
            'username': request.data.get('username'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'email': request.data.get('email')
        }
        
        serializer = PeopleSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, people, *args, **kwargs):
        people_instance = self.get_object(people)
        
        if not people_instance:
            return Response(
                {"res": "Person does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        people_instance.delete()
        return Response(
            {"res": "Person deleted!"},
            status=status.HTTP_200_OK
        )