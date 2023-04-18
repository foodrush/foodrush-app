from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render
from drf_spectacular.utils import extend_schema
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import (
    BusinessProfile,
    CustomerProfile,
    Order,
    OrderItem,
    Product,
    ShippingAddress,
)
from ..serializers import (
    BusinessProfileSerializer,
    CustomerProfileSerializer,
    OrderItemSerializer,
    OrderSerializer,
    ProductSerializer,
    ShippingAddressSerializer,
    UserSerializer,
    UserSerializerWithToken,
)


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product(request):
    """Adds a product to the database.

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_

    Example as multipart/form-data:
    ```JSON
    {
        "name": "Test Product",
        "image": [file],
        "cuisine": "Test Cuisine",
        "category": "Test Category",
        "description": "Test description",
        "price": "10.99",
        "count_in_stock": 20
    }
    ```
    """
    try:
        business = BusinessProfile.objects.get(user=request.user)
    except business.DoesNotExist as e:
        logger.debug(f"business.DoesNotExist: {e}")
        return Response(
            {"detail": "Business does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    request.data["business"] = business.id  # add the product to logged in business

    product_serializer = ProductSerializer(data=request.data)
    if product_serializer.is_valid():
        product_serializer.save()
        return Response(product_serializer.data, status=status.HTTP_201_CREATED)
    else:
        logger.debug(f"product_serializer.errors: {product_serializer.errors}")
        return Response(
            {"detail": "Product could not be created"},
            status=status.HTTP_400_BAD_REQUEST,
        )
