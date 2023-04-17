from django.contrib.auth.models import AbstractUser, User
from django.db import models


class BusinessProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    restaurant_name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.restaurant_name


class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # add phone number field to profile
    phone_number = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self) -> str:
        return self.user.email


class Product(models.Model):
    # might set to CASCASE
    # user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # business = models.ForeignKey(BusinessProfile, on_delete=models.SET_NULL, null=True)
    business = models.ForeignKey(BusinessProfile, on_delete=models.CASCADE, null=True)
    # TODO: null should be false because we need to have a business associated with a product
    name = models.CharField(max_length=200, null=True, blank=True)

    image = models.ImageField(null=True, blank=True)
    cuisine = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    review_num = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    count_in_stock = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.rating)


# region cart and order models


class Order(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.SET_NULL, null=True)

    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    is_payed = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.created_at)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.name)


class CartItem(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveBigIntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)

    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal_code = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    _id = models.AutoField(primary_key=True, editable=False)


# endregion
