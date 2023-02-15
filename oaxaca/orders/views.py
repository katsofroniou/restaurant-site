from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order
from .serializers import OrderSerializer
from django.urls import reverse

class OrderApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwards):
        orders = Order.objects
        serializer = OrderSerializer(orders, many=True)

    def post(self, request, *args, **kwargs):
        data = {
            'tableNumber': request.data.get('tableNumber'),
            'items': request.data.get('items'),
            'confirmed': request.data.get('confirmed')
        }

        serializer = OrderSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        

class OrderDetailApiView(APIView):
    def get_object(self, OrderVal, *args, **kwargs):

    def get(self, OrderVal, *args, **kwargs):

    def put(self, requst, OrderVal, *args, **kwargs):
    
    def delete(self, request, OrderVal, *args, **kwargs):
        order_instance = self.get_object(OrderVal)
        
        if not order_instance:
            return Response(
                {"res": "Order Value with this name does not exist"},
                status=status.HTTP_400_BAD_REQUEST   
            )
        
        order_instance.delete()
        return Response(
            {"res": "Order deleted!"},
            status=status.HTTP_200_OK
        )


