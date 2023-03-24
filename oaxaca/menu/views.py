from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Dish
from .serializers import DishSerializer
from django.db import models

# Class for all dishes api
class DishApiView(APIView):
    """
    API view to get a list of dishes, add a new dish, or delete multiple dishes.

    HTTP Methods:
        - GET: Returns a list of dishes filtered by a search term.
        - POST: Adds a new dish to the database.
        - DELETE: Deletes multiple dishes from the database.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get(self, request, *args, **kwargs):
        """
        Returns a list of dishes filtered by a search term.

        Query Params:
            - search: The search term to filter the dishes by.

        Returns:
            - 200 OK: The list of dishes in JSON format.
        """
        
        search_term = request.query_params.get('search', '')
        dishes = Dish.objects.filter(name__icontains=search_term)
        
        serializer = DishSerializer(dishes, many=True)
    
        return Response(serializer.data, status=status.HTTP_200_OK)  
    
    def post(self, request, *args, **kwargs):
        """
        Adds a new dish to the database.

        Request Body:
            - name: The name of the dish.
            - description: The description of the dish.
            - allergens: The allergens in the dish.
            - kcal: The number of calories in the dish.
            - course: The course that the dish belongs to.
            - price: The price of the dish.
            - vegetarian: Whether the dish is vegetarian or not.
            - vegan: Whether the dish is vegan or not.
            - available: Whether the dish is available or not.

        Returns:
            - 201 CREATED: The new dish in JSON format.
            - 400 BAD REQUEST: If the request data is invalid.
        """
        
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
        
        serializer = DishSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, *args, **kwargs):
        """
        Deletes dishes from the database.

        Query Params:
            - items: A list of names of the dishes to be deleted.

        Returns:
            - 200 OK: The number of dishes deleted.
            - 400 BAD REQUEST: If no items are sent in the request.
        """
    
        items = request.query_params.getlist('items')
        if not items:
            return Response(
                {"res": "No items to delete"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
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

class DishDetailApiView(APIView):
    """
    API view to get, update, or delete a single dish.

    HTTP Methods:
        - GET: Returns the details of a single dish.
        - PUT: Updates the details of a single dish.
        - DELETE: Deletes a single dish.
    """
    
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    
    def get_object(self, dishVal, *args, **kwargs):
        """
        Helper method to get a dish object from the database.

        Arguments:
            - dishVal: The name of the dish.

        Returns:
            - The dish object if it exists, None otherwise.
        """
        
        try:
            return Dish.objects.get(name=dishVal)
        except:
            return None
        
    def get(self, request, dishVal, *args, **kwargs):
        """
        Returns the details of a single dish.

        Arguments:
            - dishVal: The name of the dish.

        Returns:
            - 200 OK: The details of the dish in JSON format.
            - 400 BAD REQUEST: If the dish does not exist.
        """
        dish = self.get_object(dishVal)
        
        if not dish:
            return Response (
                {"res": "Dish with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = DishSerializer(dish)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, dishVal, *args, **kwargs):
        """
        Updates the details of a single dish specified by its name.

        Parameters:
            - request (HttpRequest): The request object used to make the API call.
            - dishVal (str): The name of the dish to update.

        Returns:
            - 200 OK: The updated details of the dish in JSON format.
            - 400 BAD REQUEST: If the dish does not exist.
        """
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
    
    def delete(self, request, dishVal, *args, **kwargs):
        """
        Deletes a single dish if it exists, otherwise returns an error message and bad request.
        
        Parameters:
            - request (Request): The incoming request.
            - dishVal (str): The name of the dish to be deleted.
        
        Returns:
            - 200 OK: Returns "Dish deleted!" message.
            - 400 BAD REQUEST: Returns an error message if dish does not exist.
        """

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