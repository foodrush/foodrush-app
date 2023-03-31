from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Order, OrderItem, Product, Review, ShippingAddress
from loguru import logger
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    """User serializer. Note: gives error if GET request not sent with Auth Bearer in Header

    Args:
        serializers (_type_): _description_

    Returns:
        _type_: _description_
    """

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "username", "email", "name", "is_admin"]

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        # logger.info(f"this is the name {name}")
        if name is "":
            name = obj.email
        if name is None:
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "username", "email", "name", "is_admin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
        # return str(token.acces_token)
