from loguru import logger
from django.shortcuts import render, redirect
from django.http import JsonResponse

# from .products import products
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from ..models import Product
from django.contrib.auth.hashers import make_password
from rest_framework import status

from ..serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
