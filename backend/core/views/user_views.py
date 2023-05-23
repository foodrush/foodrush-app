from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render
from drf_spectacular.utils import extend_schema
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

# from .products import products
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import BusinessProfile, CustomerProfile, Order, OrderItem, Product
from ..serializers import (
    BusinessProfileSerializer,
    CustomerProfileSerializer,
    OrderItemSerializer,
    OrderSerializer,
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data["username"] = self.user.username
        # data["email"] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(
            request.user, "customerprofile"
        )


class IsBusiness(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(
            request.user, "businessprofile"
        )


# region all users


@extend_schema(request=UserSerializer, responses=UserSerializer)
@api_view(["GET"])
# @permission_classes([IsAdminUser])
def get_users(request):
    """Gets all the users combined: both business and customer

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=UserSerializer, responses=UserSerializer)
@api_view(["GET"])
# @permission_classes([IsAdminUser])
def get_user(request, pk):
    """Gets all the users combined: both business and customer

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    # users = User.objects.all()
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=UserSerializer, responses=UserSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_logged_in_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


# endregion


# region customer


@extend_schema(request=ProductSerializer, responses=ProductSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCustomer])
def get_favorite_products(request):
    """Gets all the favorite products from the customer profile

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    customer = CustomerProfile.objects.get(user=request.user)
    products = customer.favorites.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=BusinessProfileSerializer, responses=BusinessProfileSerializer)
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCustomer])
def add_favorite_product(request):
    """Adds a product to the favorites list of the customer profile

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """

    customer = CustomerProfile.objects.get(user=request.user)
    data = request.data
    try:
        product = Product.objects.get(_id=data["_id"])
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        # check if already in favorites
        if product in customer.favorites.all():
            return Response(
                {"detail": "Product already in favorites"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            customer.favorites.add(product)
    except:
        return Response(
            {"detail": "Product already in favorites"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    customer.save()
    return Response({"detail": "Product added to favorites"}, status=status.HTTP_200_OK)


@extend_schema(request=CustomerProfile, responses=CustomerProfile)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsCustomer])
def delete_from_favorites(request, pk):
    """Deletes a product from the favorites list of the customer profile

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    customer = CustomerProfile.objects.get(user=request.user)
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        product_to_be_removed = customer.favorites.get(_id=pk)
        customer.favorites.remove(product_to_be_removed)
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product not in favorites"}, status=status.HTTP_400_BAD_REQUEST
        )

    customer.save()
    return Response(
        {"detail": "Product removed from favorites"}, status=status.HTTP_200_OK
    )


@extend_schema(request=CustomerProfile, responses=CustomerProfile)
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCustomer])
def get_orders_from_customer_profile(request):
    """Gets all the orders from the customer profile

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    customer = CustomerProfile.objects.get(user=request.user)
    orders = customer.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=UserSerializerWithToken, responses=UserSerializerWithToken)
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsCustomer])
def edit_customer(request):
    try:
        logger.info(f"request.data: {request.data}")
        customer = CustomerProfile.objects.get(user=request.user)
    except BusinessProfile.DoesNotExist:
        return Response(
            {"detail": "Customer profile does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = CustomerProfileSerializer(customer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        logger.info(f"serializer.data: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=UserSerializerWithToken, responses=UserSerializerWithToken)
@api_view(["POST"])
def register_customer(request):
    data = request.data
    try:
        logger.info(request)
        logger.info(request.data)
        # logger.info(f" this data from customer: {data.dict()}")
        user = User(
            first_name=(
                data["name"] if "name" in data.keys() else data["first_name"]
            ),  # workaround for now
            username=data["email"],
            last_name=data["last_name"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        customer_profile = CustomerProfile(
            user=user,
            phone_number=data["phone_number"],
        )
        logger.info(f"users info: {user} and customer's info: {customer_profile}")
        user.save()
        customer_profile.save()
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.info(e)
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=CustomerProfileSerializer, responses=CustomerProfileSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_customer_profile(request, pk):
    """THis is returning back the customer profile from customer ID

    Args:
        request (_type_): _description_
        pk (_type_): customer ID

    Returns:
        _type_: _description_
    """
    try:
        customer_profile = CustomerProfile.objects.get(id=pk)
        # if not hasattr(request.user, "customerprofile"):
        #     return Response(
        #         {"detail": "Wrong authorization for customer profile"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

        serializer = CustomerProfileSerializer(customer_profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.info(e)
        return Response(
            {"detail": "Customer profile does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_logged_in_customer_profile(request):
    """This should return back the customer profile from the logged in user (by its tokenk)

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    try:
        customer_profile = CustomerProfile.objects.get(user=request.user)
        if not hasattr(request.user, "customerprofile"):
            return Response(
                {"detail": "Wrong authorization for customer profile"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = CustomerProfileSerializer(customer_profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.info(e)
        return Response(
            {"detail": "Customer profile does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@extend_schema(request=CustomerProfileSerializer, responses=CustomerProfileSerializer)
@api_view(["GET"])
# @permission_classes([IsAdminUser])
# @permission_classes(IsAuthenticated)
def get_customer_profiles(request):
    customer_profiles = CustomerProfile.objects.all()
    serializer = CustomerProfileSerializer(customer_profiles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# endregion


# region business


@extend_schema(request=BusinessProfileSerializer, responses=BusinessProfileSerializer)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders_from_business(request):
    try:
        business_profile = BusinessProfile.objects.get(user=request.user)
    except Exception as e:
        logger.info(e)
        return Response(
            {"detail": "Business profile does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    products = business_profile.product_set.all()
    logger.info(f"products from business: {products}")

    try:
        ordered_products = OrderItem.objects.filter(product__in=products)
        logger.info(f"order items from business: {ordered_products}")
        business_orders = []
        for ordered_product in ordered_products:
            # get the order from every ordered product
            logger.success(f"calculated order: {ordered_product.order}")
            business_orders.append(ordered_product.order)
    except Exception as e:
        logger.info(e)
        return Response(
            {"detail": "Business profile does not have any orders at the moment"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = OrderSerializer(business_orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=BusinessProfileSerializer, responses=BusinessProfileSerializer)
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_business(request):
    try:
        business = BusinessProfile.objects.get(user=request.user)
    except BusinessProfile.DoesNotExist:
        return Response(
            {"detail": "Business profile does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = BusinessProfileSerializer(business, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=BusinessProfileSerializer, responses=BusinessProfileSerializer)
@api_view(["GET"])
def get_business_profiles(request):
    business_profiles = BusinessProfile.objects.all()
    serializer = BusinessProfileSerializer(business_profiles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=BusinessProfileSerializer, responses=BusinessProfileSerializer)
@api_view(["GET"])
def get_business_profile(request, pk):
    """This is returning back the business profile from business ID

    Args:
        request (_type_): _description_
        pk (_type_): business ID

    Returns:
        _type_: _description_
    """
    try:
        business_profile = BusinessProfile.objects.get(id=pk)
        # if not hasattr(request.user, "businessprofile"):
        #     return Response(
        #         {"detail": "Wrong authorization for business profile"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )
        serializer = BusinessProfileSerializer(business_profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.info(e)
        return Response(
            # {"detail": "Wrong authorization for business profile"},
            {"detail": "Business profile does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
def get_logged_in_business_profile(request):
    """This should return back the business profile from the logged in user (by its token)

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    try:
        business_profile = BusinessProfile.objects.get(user=request.user)
        if not hasattr(request.user, "businessprofile"):
            return Response(
                {"detail": "Wrong authorization for business profile"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = BusinessProfileSerializer(business_profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.info(e)
        return Response(
            {"detail": "Business profile does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@extend_schema(request=UserSerializerWithToken, responses=UserSerializerWithToken)
@api_view(["POST"])
def register_business(request):
    logger.info(request)
    logger.info(request.data)
    # logger.info(f" this data from business: {data.dict()}")
    data = request.data
    try:
        user = User(
            first_name=(
                data["name"] if "name" in data.keys() else data["first_name"]
            ),  # workaround for now
            last_name=data["last_name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        # create business profile from created user
        business_profile = BusinessProfile(
            user=user,
            restaurant_name=data["restaurant_name"],
        )
        user.save()
        business_profile.save()
        serializer = UserSerializerWithToken(user, many=False)
        logger.info(f"this is the saved user: {user}")
        logger.info(f"users info: {user} and business info: {business_profile}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(e)
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# endregion
