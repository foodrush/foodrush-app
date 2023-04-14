from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

# from .products import products
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import Order, OrderItem, Product, ShippingAddress, CustomerProfile
from ..serializers import (
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
    OrderSerializer,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data
    order_items = data["order_items"]

    if order_items and len(order_items) == 0:
        return Response(
            {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # Create order
        order = Order.objects.create(
            customer=CustomerProfile.objects.get(user=user),
            payment_method=data["payment_method"],
            tax_price=data["tax_price"],
            shipping_price=data["shipping_price"],
            total_price=data["total_price"],
        )

        # Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shipping_address"]["address"],
            city=data["shipping_address"]["city"],
            postal_code=data["shipping_address"]["postal_code"],
            country=data["shipping_address"]["country"],
        )

        # Create order items and set order to order_item relationship
        for cart_item in order_items:
            product = Product.objects.get(_id=cart_item["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=cart_item["qty"],  # or item.qty
                price=cart_item["price"],  # or product.price
                # image=product.image.url, # need to have a real image for this to work, NOTE: can be null
            )

            # Update stock
            product.count_in_stock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
