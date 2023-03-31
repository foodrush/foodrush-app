from django.contrib import admin
from .models import Product, ShippingAddress, Order, OrderItem, Review

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
