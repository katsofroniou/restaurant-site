from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Dish
from .serializers import DishSerializer

class DishApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']
    
    def getCourse(self, request, *arg, **kwargs):
        dishCourse = Dish.objects.filter(dish = request.Dish.course)
        serializer = DishSerializer(dishCourse, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getAllergens(self, request, *arg, **kwargs):
        dishAllergens = Dish.objects.filter(dish = request.Dish.allergens)
        serializer = DishSerializer(dishAllergens, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getPrice(self, request, *arg, **kwargs):
        dishPrice = Dish.objects.filter(dish = request.Dish.price)
        serializer = DishSerializer(dishPrice, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getName(self, request, *arg, **kwargs):
        dishName = Dish.objects.filter(dish = request.Dish.name)
        serializer = DishSerializer(dishName, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getVegetarian(self, request, *arg, **kwargs):
        dishVeg = Dish.objects.filter(dish = request.Dish.vegetarian)
        serializer = DishSerializer(dishVeg, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getVegan(self, request, *arg, **kwargs):
        dishVeg = Dish.objects.filter(dish = request.Dish.vegan)
        serializer = DishSerializer(dishVeg, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getKcal(self, request, *arg, **kwargs):
        dishKcal = Dish.objects.filter(dish = request.Dish.kcal)
        serializer = DishSerializer(dishKcal, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def getAvailable(self, request, *arg, **kwargs):
        dishAvailable = Dish.objects.filter(dish = request.Dish.available)
        serializer = DishSerializer(dishAvailable, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    
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
        
class DishDetailApiView(APIView):
    permission_classes =  [permissions.IsAuthenticated]
    http_method_names = ['get']
    
    def get_object(self, request, dishVal, *args, **kwargs):
        try:
            return Dish.objects.get(name=dishVal)
        except:
            return None
    
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