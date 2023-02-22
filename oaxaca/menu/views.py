from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Dish
from .serializers import DishSerializer

class DishApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get(self, request, *args, **kwargs):
        dishes = Dish.objects
        serializer = DishSerializer(dishes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def post(self, request, *args, **kwargs):
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
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    
    def get_object(self, dishVal, *args, **kwargs):
        try:
            return Dish.objects.get(name=dishVal)
        except:
            return None
        
    def get(self, request, dishVal, *args, **kwargs):
        dish = self.get_object(dishVal)
        
        if not dish:
            return Response (
                {"res": "Dish with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = DishSerializer(dish)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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