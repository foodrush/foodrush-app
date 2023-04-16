from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_field

# from .products import products
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import (
    Order,
    OrderItem,
    Product,
    ShippingAddress,
    CustomerProfile,
    CartItem,
)
from ..serializers import (
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
    OrderSerializer,
    CartItemSerializer,
)


@extend_schema(request=OrderSerializer, responses=OrderSerializer)
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
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Add to cart view"""
    data = request.data
    user = request.user
    customer = CustomerProfile.objects.get(user=user)
    product = Product.objects.get(_id=data["product_id"])
    qty = data["qty"]

    # Check if product is already in cart
    cart_item = CartItem.objects.filter(product=product, customer=customer).first()
    if cart_item:
        cart_item.qty += int(qty)
        cart_item.save()
    else:  # Create new cart item
        cart_item = CartItem.objects.create(product=product, customer=customer, qty=qty)

    serializer = CartItemSerializer(cart_item, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    # Get the product to remove from the cart
    product = get_object_or_404(Product, pk=pk)

    # Get the user's cart
    cart_item = CartItem.objects.get(
        customer=CustomerProfile.objects.get(user=request.user), product=product
    )

    # Check if the product is already in the cart
    # cart_item = user_cart.items.filter(product=product).first()

    if cart_item is not None:
        if cart_item.qty > 1:
            # If the cart item has a quantity greater than 1, decrease the quantity by 1
            cart_item.qty -= 1
            cart_item.save()
        else:
            # If the cart item has a quantity of 1, delete the cart item
            cart_item.delete()

    # Return a success response
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def display_cart(request):
    user = request.user
    customer = CustomerProfile.objects.get(user=user)
    cart_items = CartItem.objects.filter(customer=customer)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
