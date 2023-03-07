from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Dish
from .serializers import DishSerializer
from django.db import models

# Class for all dishes api
class DishApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get(self, request, *args, **kwargs):
        
        # Filters all dishes by the search_term entered if any
        search_term = request.query_params.get('search', '')
        dishes = Dish.objects.filter(name__icontains=search_term)
        
        # Converts this data to JSON 
        serializer = DishSerializer(dishes, many=True)
    
        # Returns serialized data and ok status
        return Response(serializer.data, status=status.HTTP_200_OK)  
    
    def post(self, request, *args, **kwargs):
        
        # Defines data to be posted
        # Get's details of data form the request
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'allergens': request.data.get('allergens'),
            'kcal': request.data.get('kcal'),
            'course': request.data.get('course'),
            'price': request.data.get('price'),
            'vegetarian': request.data.get('vegetarian'),
            'vegan': request.data.get('vegan'),
            'available': request.data.get('available')
        }
        
        # Converts the data to JSON
        serializer = DishSerializer(data=data)
        
        
        # If the data is valid it is added to the database
        # Otherwise, an error is returned
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, *args, **kwargs):
        # Checks to see if the dish actually exists in the database
        items = request.query_params.getlist('items')
        if not items:
            return Response(
                {"res": "No items to delete"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Deletes all items sent in request
        # If none are sent, nothing is deleted and an error is returned
        # Otherwise, a deletion message and ok status is returned
        deleted_count, _ = Dish.objects.filter(name__in=items).delete()
        if deleted_count == 0:
            return Response(
                {"res": "No items deleted"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response(
            {"res": f"Deleted {deleted_count} items"},
            status=status.HTTP_200_OK
        )

# Class for single dish's details api
class DishDetailApiView(APIView):
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    
    # Get's the dish and returns it if it exists
    def get_object(self, dishVal, *args, **kwargs):
        try:
            return Dish.objects.get(name=dishVal)
        except:
            return None
        
    # Return JSON serialization of dish requested if it exists
    # Otherwise an error message and bad request is returned
    def get(self, request, dishVal, *args, **kwargs):
        dish = self.get_object(dishVal)
        
        if not dish:
            return Response (
                {"res": "Dish with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = DishSerializer(dish)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Updates dish details if dish exists
    # Otherwise returns error message and bad request
    def put(self, request, dishVal, *args, **kwargs):
        dish = self.get_object(dishVal)
        
        if not dish:
            return Response (
                {"res": "Dish with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'allergens': request.data.get('allergens'),
            'kcal': request.data.get('kcal'),
            'course': request.data.get('course'),
            'price': request.data.get('price'),
            'vegetarian': request.data.get('vegetarian'),
            'vegan': request.data.get('vegan'),
            'available': request.data.get('available')
        }
        
        serializer = DishSerializer(instance= dish, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Deletes single dish if it exists
    # Otherwise returns error message and bad request
    def delete(self, request, dishVal, *args, **kwargs):
        dish_instance = self.get_object(dishVal)
        
        if not dish_instance:
            return Response(
                {"res": "Dish with this name does not exist"},
                status=status.HTTP_400_BAD_REQUEST   
            )
        
        dish_instance.delete()
        return Response(
            {"res": "Dish deleted!"},
            status=status.HTTP_200_OK
        )
