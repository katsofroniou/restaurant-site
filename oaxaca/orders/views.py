from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order
from .serializers import OrderSerializer
from django.shortcuts import render
from django.http import JsonResponse

class OrderApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwards):
        orders = Order.objects
        serializer = OrderSerializer(orders, many=True)

        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'id': request.data.get('id'),
            'orderTime': request.data.get('orderTime'),
            'tableNumber': request.data.get('tableNumber'),
            'items': request.data.get('items'),
            'confirmed': request.data.get('confirmed'),
            'orderReady': request.data.get('orderReady'),
            'OrderComplete': request.data.get('OrderComplete')
        }

        serializer = OrderSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        items = request.query_params.getlist('items')
        if not items:
            return Response(
                {"res": "No items to delete"},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        deleted_count, _ = Order.objects.filter(name_in=items).delete()
        if deleted_count == 0:
            return Response(
                {"res": "No items deleted"},
                status = status.HTTP_400_BAD_REQUEST
            )
            return Response(
                {"res": f"Deleted {deleted_count} items"},
                status = status.HTTP_200_OK
            )

        

class OrderDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, OrderVal, *args, **kwargs):
        try:
            return Order.objects.get(id=OrderVal)
        except:
            return None


    def get(self, request, OrderVal, *args, **kwargs):
        order = self.get_object(OrderVal)
        
        if not order:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def put(self, request, OrderVal, *args, **kwargs):
        order = self.get_object(OrderVal)
        
        if not order:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        data = {
            'id': request.data.get('id'),
            'orderTime': request.data.get('orderTime'),
            'tableNumber': request.data.get('tableNumber'),
            'items': request.data.get('items'),
            'confirmed': request.data.get('confirmed'),
            'orderReady': request.data.get('orderReady'),
            'OrderComplete': request.data.get('OrderComplete')
        }
        
        serializer = OrderSerializer(instance= order, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
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

def waiterViewOrders(request):
    orders = Order.objects.order_by('orderTime')
    serializer = OrderSerializer(orders, many=True)
    return JsonResponse(serializer.data, safe=False)
