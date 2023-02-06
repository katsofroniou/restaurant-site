from django.http import HttpResponse
from django.views import View

class CallWaiterView(View):
    def post(self, request):
        # Extract the notification_type from the request data
        notification_type = request.POST.get('notification_type')
         # Handle the notification from the button press
        if notification_type == 'call_waiter':
            if request.POST.get('call_waiter_button') == 'call_waiter_button':
                return HttpResponse("Waiter has been called")
        return HttpResponse("Waiting for waiter to be called")

'''
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def button_pressed():
    if request.method == 'POST':
        if request.form.get('waiter_button') == 'waiter_button':
            return "Waiter has been called"
    return "waiting"

if __name__ == '__main__':
    app.run(debug = True)
'''