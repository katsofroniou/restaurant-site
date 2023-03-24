from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order, OrderDish
from .serializers import OrderSerializer, OrderDishSerializer

# CLass for all orders api
class OrderApiView(APIView):
    """
    API view to get a list of orders, add a new order, or delete multiple orders.

    HTTP Methods:
        - GET: Returns a list of orders filtered by a search term.
        - POST: Adds a new order to the database.
        - DELETE: Deletes multiple orders from the database.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get(self, request, *args, **kwargs):
        """
        Returns a list of dishes.

        Returns:
            - 200 OK: The list of orders in JSON format.
        """
        orders = Order.objects
        serializer = OrderSerializer(orders, many=True)

        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Adds a new dish to the database.

        Request Body:
            - id: The id of the order.
            - orderTime: The time the order was placed.
            - tableNumber: The table that placed the order.
            - items: The dishes in the order.
            - confirmed: Whether the order is confirmed or not.
            - orderReady: Whether the order is ready or not.
            - OrderComplete: Whether the order is complete or not.
            
        Returns:
            - 201 CREATED: The new order in JSON format.
            - 400 BAD REQUEST: If the request data is invalid.
        """
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
        """
        Deletes orders from the database.

        Query Params:
            - items: A list of ids of the orders to be deleted.

        Returns:
            - 200 OK: The number of orders deleted.
            - 400 BAD REQUEST: If no items are sent in the request.
        """
        
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
    """
    API view to get, update, or delete a single order.

    HTTP Methods:
        - GET: Returns the details of a single order.
        - PUT: Updates the details of a single order.
        - DELETE: Deletes a single order.
    """
    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, OrderVal, *args, **kwargs):
        """
        Helper method to get a order object from the database.

        Arguments:
            - OrderVal: The id of the order.

        Returns:
            - The order object if it exists, None otherwise.
        """
        
        try:
            return Order.objects.get(id=OrderVal)
        except:
            return None

    def get(self, request, OrderVal, *args, **kwargs):
        """
        Returns the details of a single order.

        Arguments:
            - OrderVal: The name of the order.

        Returns:
            - 200 OK: The details of the order in JSON format.
            - 400 BAD REQUEST: If the order does not exist.
        """
        
        order = self.get_object(OrderVal)
        
        if not order:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, OrderVal, *args, **kwargs):
        """
        Updates the details of a single order specified by its id.

        Parameters:
            - request (HttpRequest): The request object used to make the API call.
            - orderVal (int): The id of the dish to update.

        Returns:
            - 200 OK: The updated details of the order in JSON format.
            - 400 BAD REQUEST: If the order does not exist.
        """
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
        """
        Deletes a single order if it exists, otherwise returns an error message and bad request.
        
        Parameters:
            - request (Request): The incoming request.
            - OrderVal (int): The id of the order to be deleted.
        
        Returns:
            - 200 OK: Returns "Order deleted!" message.
            - 400 BAD REQUEST: Returns an error message if the order does not exist.
        """
        
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
        
class OrderDishApiView(APIView):
    """
    API view to get a list of order dishes, add a new order dish, or delete multiple order dishes.

    HTTP Methods:
        - GET: Returns a list of order dishes.
        - POST: Adds a new order dish to the database.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        """
        Adds a new order dish to the database.

        Request Body:
            - order: The id of the order to add the dish to.
            - dish: The id of the dish to add to the order.
            - quantity: The quantity of the dish in the order.
            
        Returns:
            - 201 CREATED: The new order dish in JSON format.
            - 400 BAD REQUEST: If the request data is invalid.
        """
        order_dishes = OrderDish.objects.all()
        serializer = OrderDishSerializer(order_dishes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Deletes order dishes from the database.

        Query Params:
            - items: A list of ids of the order dishes to be deleted.

        Returns:
            - 200 OK: The number of order dishes deleted.
            - 400 BAD REQUEST: If no items are sent in the request.
        """
        serializer = OrderDishSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
