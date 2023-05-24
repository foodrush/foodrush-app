from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from drf_spectacular.utils import extend_schema, extend_schema_field
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

# from .products import products
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import (
    CartItem,
    CustomerProfile,
    Order,
    OrderItem,
    Product,
    ShippingAddress,
)
from ..serializers import (
    CartItemSerializer,
    OrderSerializer,
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
    ShippingAddressSerializer,
)
from .user_views import IsCustomer


@extend_schema(request=OrderSerializer, responses=OrderSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCustomer])
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
            tax_price=data["tax_price"] if "tax_price" in data else 0.0,
            shipping_price=data["shipping_price"] if "shipping_price" in data else 0.0,
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
                image=product.image.url,
            )

            # Update stock
            product.count_in_stock -= item.qty
            # If product is out of stock, set product to not available
            if product.count_in_stock <= 0:
                return Response(
                    {
                        "detail": f"Product {product.name} with id: {product._id} is out of stock"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            product.save()

        # delete products from user's cart
        serializer = OrderSerializer(order, many=False)

        # order items are cart items sent from the frontend

        CartItem.objects.filter(
            customer=CustomerProfile.objects.get(user=user)
        ).delete()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(request=OrderSerializer, responses=OrderSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCustomer])
def get_order_by_id(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    # if user.is_staff or order.customer == user.customerprofile:
    # FIXME: change this maybe if needed according to the requests
    if CustomerProfile.objects.get(user=user) == order.customer:
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    else:
        return Response(
            {"detail": "Not authorized to view this order"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCustomer])
def add_to_cart(request):
    """Add to cart view"""
    data = request.data
    user = request.user
    customer = CustomerProfile.objects.get(user=user)
    product = Product.objects.get(_id=data["product_id"])
    qty = data["qty"]

    # Check if there are products from other businesses in cart
    if CartItem.objects.filter(customer=customer).exists():
        cart_items = CartItem.objects.filter(customer=customer)
        for item in cart_items:
            logger.info(f"item.product.business: {item.product.business}")
            if item.product.business != product.business:
                return Response(
                    {
                        "detail": "You cannot add products from different businesses to the cart"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

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
@permission_classes([IsAuthenticated, IsCustomer])
def remove_from_cart(request, pk):
    """Remove product from cart

    Args:
        request (_type_): _description_
        pk (_type_): product's id

    Returns:
        _type_: _description_
    """
    # Get the product to remove from the cart
    product = get_object_or_404(Product, pk=pk)

    # Get the user's cart
    try:
        cart_item = CartItem.objects.get(
            customer=CustomerProfile.objects.get(user=request.user), product=product
        )
    except CartItem.DoesNotExist as e:
        logger.error(e)
        return Response(
            {"detail": "The product is not in the cart"},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Check if the product is already in the cart
    # cart_item = user_cart.items.filter(product=product).first()

    if cart_item is not None:
        removed_item = cart_item.product
        if cart_item.qty > 1:
            # If the cart item has a quantity greater than 1, decrease the quantity by 1
            cart_item.qty -= 1
            cart_item.save()
        else:
            # If the cart item has a quantity of 1, delete the cart item
            cart_item.delete()

    # Return a success response
    logger.info(f"Removed {removed_item} from cart")
    return Response(
        {
            "detail": "The product was removed from the cart",
            # "cart_item": ProductSerializer(removed_item).data,
        },
        status=status.HTTP_200_OK,
    )


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsCustomer])
def remove_all_items_from_cart(request):
    """Removes all items from the cart

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    # Get the user's cart
    user = request.user
    customer = CustomerProfile.objects.get(user=user)
    cart_items = CartItem.objects.filter(customer=customer)

    # Delete all items in the cart
    cart_items.delete()

    # Return a success response
    return Response(
        {
            "detail": "All items were removed from the cart",
        },
        status=status.HTTP_204_NO_CONTENT,
    )


@extend_schema(request=CartItemSerializer, responses=CartItemSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCustomer])
def get_cart(request):
    """Gets the cart for the current user
    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    user = request.user
    customer = CustomerProfile.objects.get(user=user)
    cart_items = CartItem.objects.filter(customer=customer)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
