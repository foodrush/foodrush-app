from django.urls import path
from ..views import order_views as views


urlpatterns = [
    path("add/", views.add_order_items, name="orders-add"),
    path("add-to-cart/", views.add_to_cart, name="cart-add"),
    path("remove-from-cart/<int:pk>/", views.remove_from_cart, name="remove-from-cart"),
    path("cart/", views.display_cart, name="display-cart"),
]
