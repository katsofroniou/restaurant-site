from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order
from .serializers import OrderSerializer

class OrderApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwards):
        orders = Order.objects
        serializer = OrderSerializer(orders, many=True)

    def post(self, request, *args, **kwargs):
        

class OrderDetailApiView(APIView):
    def get_object(self, OrderVal, *args **kwargs):

    def get(self, OrderVal, *args, **kwargs):

    def put(self, requst, OrderVal, *args, **kwargs):
    
    def delete(self, OrderVal, *args, **kwargs):