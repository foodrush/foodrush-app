from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from loguru import logger
from .models import *

# class ProductTests(APITestCase):
#     def test_create_product(self):
#         """
#         Ensure we can create a new product object.
#         """
#         url = reverse("add-products")
#         data = {
#             "business": 1,
#             "name": "Test Product",
#             "image": "",
#             "cuisine": "Test Cuisine",
#             "category": "Test Category",
#             "description": "Test description",
#             "rating": "4.5",
#             "review_num": 10,
#             "price": "10.99",
#             "count_in_stock": 20,
#             "created_at": "2022-04-10T08:00:00Z",
#             "_id": 1,
#         }
#         response = self.client.post(url, data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Product.objects.count(), 1)
#         self.assertEqual(Product.objects.get().name, "Test Product")


class AddOrderItemsTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            username="user1@gmail.com", password="password123"
        )
        self.user2 = User.objects.create_user(
            username="user2@gmail.com", password="password456"
        )

        self.customer1 = CustomerProfile.objects.create(
            user=self.user1, phone_number="1234567890"
        )
        self.customer2 = CustomerProfile.objects.create(
            user=self.user2, phone_number="0987654321"
        )

        self.business1 = BusinessProfile.objects.create(
            user=self.user1, restaurant_name="Test Restaurant 1"
        )
        self.business2 = BusinessProfile.objects.create(
            user=self.user2, restaurant_name="Test Restaurant 2"
        )
        self.product1 = Product.objects.create(
            business=self.business1,
            name="Test Product 1",
            description="A test product",
            price=10.0,
            count_in_stock=10,
            image="",
        )
        self.product2 = Product.objects.create(
            business=self.business2,
            name="Test Product 2",
            description="A test product",
            price=20.0,
            count_in_stock=10,
            image="",
        )
        # login user

    def get_token(self):
        token_obtain_pair_url = reverse("token_obtain_pair")
        token_obtain_pair_data = {
            "username": "user1@gmail.com",
            "password": "password123",
        }
        response = self.client.post(
            token_obtain_pair_url, data=token_obtain_pair_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data["access"]

    def test_add_order_items(self):
        # add reverse for my view
        url = reverse("orders-add")  # add order item url
        data = {
            "payment_method": "paypal",
            "tax_price": 3.0,
            "shipping_price": 5.0,
            "total_price": 38.0,
            "order_items": [
                {"product": self.product1._id, "qty": 2, "price": 10.0},
                {"product": self.product2._id, "qty": 1, "price": 20.0},
            ],
            "shipping_address": {
                "address": "123 Main St.",
                "city": "Anytown",
                "postal_code": "12345",
                "country": "US",
            },
        }
        token = (
            "Bearer "
            # + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzYxNzg0LCJpYXQiOjE2ODExNjk3ODQsImp0aSI6IjBmN2M0MzI1ZGNkMDRjYzBhOWYyZWNmMDE5MDk4ZTJkIiwidXNlcl9pZCI6MzV9.znG03Nz9l94KEYygNt4mZ1pcCkLm1jZwvuV7flcovDw"
            + self.get_token()
        )
        self.client.credentials(HTTP_AUTHORIZATION=token)
        response = self.client.post(
            url,
            data,
            format="json",
        )
        logger.critical(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
