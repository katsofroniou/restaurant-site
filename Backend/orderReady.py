from django.http import HttpResponse
from django.views import View

class OrderReadyView(View):
    def post(self, request):
        # Extract the notification_type from the request data
        notification_type = request.POST.get('notification_type')
         # Handle the notification from the button press
        if notification_type == 'order_ready':
            if request.POST.get('order_ready_button') == 'order_ready_button':
                return HttpResponse("Kitchen staff has notified waiter")
        return HttpResponse("Order ready to be collected by waiter")
