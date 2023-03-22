from django.shortcuts import render, redirect
from django.http import JsonResponse
from .products import products
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


@api_view(["GET"])
def get_routes(request):
    testing = [
        "api/products",
        "api/products/create",
        "api/products/upload",
        "api/products/<id>",
    ]
    return Response(testing)


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
