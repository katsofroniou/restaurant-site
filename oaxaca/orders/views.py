from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order
from .serializers import OrderSerializer
from django.urls import reverse


class OrderApiView(APIView):
    def get(self, request, *args, **kwards):

    def post(self, request, *args, **kwargs):
        
    

class OrderDetailApiView(APIView):
    def get_object(self, OrderVal, *args **kwargs):

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


