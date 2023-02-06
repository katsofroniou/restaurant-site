from django.http import HttpResponse
from django.views import View

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
