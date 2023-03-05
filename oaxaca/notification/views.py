from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Notification
from .serializers import NotificationSerializer
from django.shortcuts import render
from django.http import JsonResponse

class NotificationApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwards):
        notifications = Notification.objects
        serializer = NotificationSerializer(notifications, many=True)

        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'sender': request.data.get('sender'),
            'recipient': request.data.get('receiver'),
            'message': request.data.get('message'),
            'time': request.data.get('time'),

        }

        serializer = NotificationSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        

class NotificationDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, time, *args, **kwargs):
        try:
            return Notification.objects.get(name=time)
        except:
            return None


    def get(self, request, time, *args, **kwargs):
        notification = self.get_object(time)
        
        if not notification:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        serializer = NotificationSerializer(notification)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def put(self, request, time, *args, **kwargs):
        notification = self.get_object(time)
        
        if not notification:
            return Response (
                {"res": "Order with this name does not exist"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        data = {
            'sender': request.data.get('sender'),
            'receiver': request.data.get('receiver'),
            'message': request.data.get('message'),
            'time': request.data.get('time'),

        }
        
        serializer = NotificationSerializer(instance= notification, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request, time, *args, **kwargs):
        time_instance = self.get_object(time)
        
        if not time_instance:
            return Response(
                {"res": "Order Value with this name does not exist"},
                status=status.HTTP_400_BAD_REQUEST   
            )
        
        time_instance.delete()
        return Response(
            {"res": "Order deleted!"},
            status=status.HTTP_200_OK
        )



def waiterViewNotifications(request):
    notifications = Notification.objects.order_by('time')
    serializer = NotificationSerializer(notifications, many=True)
    return JsonResponse(serializer.data, safe=False)
