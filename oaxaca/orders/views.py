from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order
from .serializers import OrderSerializer

# CLass for all orders api
class OrderApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        orders = Order.objects
        # Converts data into JSON
        serializer = OrderSerializer(orders, many=True)

        # Returns serialized data and ok status
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Defines data to be posted
        # Get's details of data from the request
        data = {
            'id': request.data.get('id'),
            'orderTime': request.data.get('orderTime'),
            'tableNumber': request.data.get('tableNumber'),
            'items': request.data.get('items'),
            'confirmed': request.data.get('confirmed'),
            'orderReady': request.data.get('orderReady'),
            'orderDelivered': request.data.get('orderDelivered'),
            'OrderComplete': request.data.get('OrderComplete')
        }

        # Converts the data into JSON
        serializer = OrderSerializer(data = data)

        # If the data is valid it's added to the database
        # Otherwise, an error is returned
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

        
    def delete(self, request, *args, **kwargs):
        # Checks if the order actually exists in the database
        items = request.query_params.getlist('items')
        if not items:
            return Response(
                {"res": "No items to delete"},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        # Deletes all items sent in request
        # If none are sent, nothing is deleted and a 400 error is returned
        # Otherwise, a deletion message and ok status is returned
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
    
    def patch(self, request, *args, **kwargs):
        data = {
            'dish': request.data.get('dish'),
            'description': request.data.get('description'),
            'course': request.data.get('course'),
            'allergens': request.data.get('allergens'),
            'vegan/vegetarian': request.data.get('vegan/vegetarian'),
            'cost': request.data.get('cost'),
            'quantity': request.data.get('quantity')
        }


# Class for single order's details api
class OrderDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Get's the order and returns it if it exists
    def get_object(self, OrderVal, *args, **kwargs):
        try:
            return Order.objects.get(id=OrderVal)
        except:
            return None

    # Return JSON serialization of order requested if it exists
    # Otherwise, an error message and bad request is returned
    def get(self, request, OrderVal, *args, **kwargs):
        order = self.get_object(OrderVal)
        
        if not order:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Updates order details if order exists
    # Otherwise, returns error message and bad request
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
            'orderDelivered': request.data.get('orderDelivered'),
            'OrderComplete': request.data.get('OrderComplete')
        }
        
        serializer = OrderSerializer(instance= order, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Deletes single dish if it exists
    # Otherwise, returns error message and bad request
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
