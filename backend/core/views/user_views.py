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

from ..models import BusinessProfile, CustomerProfile, Product
from ..serializers import (
    BusinessProfileSerializer,
    CustomerProfileSerializer,
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


# region all users


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
    return Response(serializer.data)


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
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_logged_in_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# endregion


# region customer


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
        return Response(serializer.data)
    except Exception as e:
        logger.info(e)
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
# @permission_classes([IsAdminUser])
def get_customer_profile(request, pk):
    customer_profile = CustomerProfile.objects.get(id=pk)
    serializer = CustomerProfileSerializer(customer_profile, many=False)
    return Response(serializer.data)


@api_view(["GET"])
# @permission_classes([IsAdminUser])
# @permission_classes(IsAuthenticated)
def get_customer_profiles(request):
    customer_profiles = CustomerProfile.objects.all()
    serializer = CustomerProfileSerializer(customer_profiles, many=True)
    return Response(serializer.data)


# endregion


# region business


@api_view(["GET"])
def get_business_profiles(request):
    business_profiles = BusinessProfile.objects.all()
    serializer = BusinessProfileSerializer(business_profiles, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_business_profile(request, pk):
    business_profile = BusinessProfile.objects.get(id=pk)
    serializer = BusinessProfileSerializer(business_profile, many=False)
    return Response(serializer.data)


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
        return Response(serializer.data)
    except Exception as e:
        logger.error(e)
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# endregion
