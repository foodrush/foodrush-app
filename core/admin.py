from django.contrib import admin

from .models import (
    BusinessProfile,
    CartItem,
    CustomerProfile,
    Order,
    OrderItem,
    Product,
    Review,
    ShippingAddress,
)

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(BusinessProfile)
admin.site.register(CustomerProfile)
admin.site.register(CartItem)
