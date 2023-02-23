from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from models import Dish

class MenuAPIView(APIView):
    def get(self, request):
        dishes = Dish.objects.all()
        serialized_data = [{"name": dish.name, 
        "description": dish.description, "course": dish.course, 
        "allergens": [allergen.allergen for allergen in dish.allergens.all()], 
        "vegetarian": dish.vegetarian, "vegan": dish.vegan, "available": dish.available, 
        "kcal": dish.kcal, "price": dish.price} for dish in dishes]
        return Response(serialized_data)


class FilterAPIView(APIView):
    def get(self, request):
        term = request.query_params.get('term', '').lower()
        dishes = Dish.objects.filter(
            models.Q(name__icontains=term) |
            models.Q(description__icontains=term) |
            models.Q(course__icontains=term) |
            models.Q(allergens__allergen__icontains=term)
        )
        serialized_data = [{
            "name": dish.name, 
            "description": dish.description, 
            "course": dish.course, 
            "allergens": [allergen.allergen for allergen in dish.allergens.all()], 
            "vegetarian": dish.vegetarian, 
            "vegan": dish.vegan, 
            "available": dish.available, 
            "kcal": dish.kcal, 
            "price": dish.price
        } for dish in dishes]
        return Response(serialized_data)
