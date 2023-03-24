from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Order
from rest_framework import status

# Create your tests here.

class TestOrders(APITestCase):
    def test_get_order(self):
        response = self.client.get('/orders/api/99/')
        self.assertEqual(response.data, {'id': 99, 'orderTime': '07:56:02.329201', 'tableNumber':16, 'items': [6, 7, 8], 'confirmed': False, 'orderReady': False, 'OrderComplete': False})

    def test_create_order_not_authorised(self):
         data = {
              'tableNumber': 52,
              'items': [5, 10, 13, 14],
              'confirmed': True,
              'orderReady': False,
              'OrderComplete': False,
         }
         response = self.client.post('/orders/api', data)
         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_order_authorised(self):
        data = {
            'username': 'customer',
            'password': 'customerpassword',
        }
        response = self.client.post('/token/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
