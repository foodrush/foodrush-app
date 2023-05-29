from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render
from drf_spectacular.utils import extend_schema
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser
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

# region GET requests - business products


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["GET"])
def get_product_from_business(request, bpk, ppk):
    """Returns a list of products from a given business.

    Args:
        request (_type_): _description_
        bpk (_type_): ID for the business
        ppk (_type_):   ID for the product


    Returns:
        _type_: _description_

    Example: (1 product)
    ```JSON
        {
            "_id": 22,
            "business_name": "McDonald's",
            "name": "Test Product 5",
            "image": "/images/generic-img1_lcQsTJI.png",
            "cuisine": "Test Cuisine",
            "category": "Test Category",
            "description": "Test Desc",
            "rating": null,
            "review_num": 0,
            "price": "10.99",
            "count_in_stock": 20,
            "created_at": "2023-04-18T18:10:09.521115Z",
            "business": 2
        }
    ```
    """
    try:
        business = BusinessProfile.objects.get(id=bpk)
    except BusinessProfile.DoesNotExist as e:
        logger.debug(f"business.DoesNotExist: {e}")
        return Response(
            {"detail": "Business does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        product = Product.objects.get(business=business, _id=ppk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist as e:
        logger.debug(f"product.DoesNotExist: {e}")
        return Response(
            {"detail": "Product does not exist for this business"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["GET"])
def get_products_from_business(request, pk):
    """Returns a list of products from a given business.

    Args:
        request (_type_): _description_
        pk (_type_): ID for the business

    Returns:
        _type_: _description_

    Example: (many products)
    ```JSON
        [
            {
                "_id": 22,
                "business_name": "McDonald's",
                "name": "Test Product 5",
                "image": "/images/generic-img1_lcQsTJI.png",
                "cuisine": "Test Cuisine",
                "category": "Test Category",
                "description": "Test Desc",
                "rating": null,
                "review_num": 0,
                "price": "10.99",
                "count_in_stock": 20,
                "created_at": "2023-04-18T18:10:09.521115Z",
                "business": 2
            },
            {
                "next_product":"..."
            }
        ]
    ```
    """
    try:
        business = BusinessProfile.objects.get(id=pk)
    except BusinessProfile.DoesNotExist as e:
        logger.debug(f"business.DoesNotExist: {e}")
        return Response(
            {"detail": "Business does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    products = Product.objects.filter(business=business)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# endregion

# region GET requests - plain products


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


# endregion

# region POST requests - add product


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
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
    except BusinessProfile.DoesNotExist as e:
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


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def edit_product(request, pk):
    """Edits a product in the database.

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_

    Assuming editable attributes - Example as multipart/form-data:

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
    except BusinessProfile.DoesNotExist as e:
        logger.debug(f"business.DoesNotExist: {e}")
        return Response(
            {"detail": "Business does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        # get product id from url param int:id
        product = Product.objects.get(business=business, _id=pk)
    except Product.DoesNotExist as e:
        logger.debug(f"product.DoesNotExist: {e}")
        return Response(
            {"detail": "Product does not exist for this business"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    request.data[
        "business"
    ] = business.id  # ensure product is owned by logged in business
    product_serializer = ProductSerializer(product, data=request.data)
    if product_serializer.is_valid():
        product_serializer.save()
        return Response(product_serializer.data, status=status.HTTP_200_OK)
    else:
        logger.debug(f"product_serializer.errors: {product_serializer.errors}")
        return Response(
            {"detail": "Product could not be created"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    """Deletes  a product in the database.

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """

    try:
        business = BusinessProfile.objects.get(user=request.user)
    except BusinessProfile.DoesNotExist as e:
        logger.debug(f"business.DoesNotExist: {e}")
        return Response(
            {"detail": "Business does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        # get product id from url param int:id
        product = Product.objects.get(business=business, _id=pk)
        logger.info(f"deleting product: {product}")
    except Product.DoesNotExist as e:
        logger.debug(f"product.DoesNotExist: {e}")
        return Response(
            {"detail": "Product does not exist for this business"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    product.delete()
    return Response(
        {"detail": "Product deleted successfully"}, status=status.HTTP_200_OK
    )


# endregion
