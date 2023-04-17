from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect, render
from loguru import logger
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_spectacular.utils import extend_schema
from ..models import Product
from ..serializers import ProductSerializer, UserSerializer, UserSerializerWithToken


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
    pass
