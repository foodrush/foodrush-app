from django.contrib.auth.models import User
from loguru import logger
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    BusinessProfile,
    CustomerProfile,
    Order,
    OrderItem,
    Product,
    Review,
    ShippingAddress,
)

# region customers-orders serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)
    customer = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        """Returns a serialized representation of all related OrderItem objects for the given object instance.

        Args:
            obj: An instance of a model class that has a ForeignKey relationship with the OrderItem model.

        Returns:
            A list of dictionaries representing the serialized OrderItem objects.
        """
        # these are the OrderItem objects gotten from the reverse relationship of the OrderItem model with the Order model
        items = (
            obj.orderitem_set.all()
        )  # normal:  OrderItem.objects.filter(order=obj) or reverse: obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shipping_address, many=False)
        except Exception as e:
            logger.error(f"Error with shipping address: {e}")
            address = False
        return address

    def get_customer(self, obj):
        customer_user = obj.customer
        serializer = CustomerProfileSerializer(customer_user, many=False)
        return serializer.data


# endregion


# region product serializers
class ProductSerializer(serializers.ModelSerializer):
    business_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_business_name(self, obj):
        return obj.business.restaurant_name


# endregion

# region profiles serializers


class BusinessProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProfile
        fields = "__all__"


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    """User serializer. Note: gives error if GET request not sent with Auth Bearer in Header

    Args:
        serializers (_type_): _description_

    Returns:
        _type_: _description_
    """

    name = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "is_admin",
            "first_name",
            "last_name",
        ]

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        # logger.info(f"this is the name {name}")
        if name == "":
            name = obj.email
        if name is None:
            name = obj.email
        return name

    def get_last_name(self, obj):
        return obj.last_name

    def get_first_name(self, obj):
        return obj.first_name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "is_admin",
            "token",
            "first_name",
            "last_name",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
        # return str(token.acces_token)


# endregion
