from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe

# Create your views here.
stripe.api_key = 'sk_test_51Mm1OUGHCVd3YY0Zi5XV9OIwxpmC8eQdQHhxAkf3BlgbpSKuHbNacK8fJGg2HckJE9GHA2RUbfoPNGdTiPbSjIZC00QEjHoiKm'

class Payments(APIView):
    def post(request, self, *args, **kwargs):
        test_intent = stripe.PaymentIntent.create(
            amount=1000, currency="pln",
            payment_method_types=['card'],
            receipt_email='testemail@email.com'
        )
        
        return Response(status= status.HTTP_200_OK, data=test_intent)