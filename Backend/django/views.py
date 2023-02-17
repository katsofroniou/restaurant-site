from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

# Create your views here.

class OrderReadyView(View):
    def post(self, request):
        # Extract the notification_type from the request data
        notification_type = request.POST.get('notification_type')
         # Handle the notification from the button press
        if notification_type == 'order_ready':
            if request.POST.get('order_ready_button') == 'order_ready_button':
                return HttpResponse("Kitchen staff has notified waiter")
        return HttpResponse("Order ready to be collected by waiter")

class CallWaiterView(View):
    def post(self, request):
        # Extract the notification_type from the request data
        notification_type = request.POST.get('notification_type')
         # Handle the notification from the button press
        if notification_type == 'call_waiter':
            if request.POST.get('call_waiter_button') == 'call_waiter_button':
                return HttpResponse("Waiter has been called")
        return HttpResponse("Waiting for waiter to be called")

class WaiterNotificationView(View):
    def post(self, request):
        # Handle the notification from the kitchen staff
        notification_type = request.POST.get('notification_type')
        if notification_type == 'order_ready':
            print("Order ready: notification received!")
        elif notification_type == 'call_waiter':
            print("Customer needs assistance: notification received!")

        # feature has not been implemented yet   
            ''' 
        elif notification_type == 'order_cancelled':
            print("Order cancelled: notification received!")
            '''
        else:
            print("Unknown notification received!")
        return HttpResponse("OK")
    
class WaiterCancelOrderView(View):
    def post(self, request):
        if requests.POST.get('notification_type') == "cancel_order":
            if request.POST.get("cancel_order_button") == "cancel_order_button":
                return HttpResonse ("Cancelling order and updating kitchen staff")
        
                
            
        
