from django.urls import path
from payments.views import Payments

urlpatterns = [
    path('test-intent/', Payments.as_view(), name='test_payment_intent'),
]