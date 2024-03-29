from django.urls import path

from ..views import order_views as views

urlpatterns = [
    path("add/", views.add_order_items, name="orders-add"),
    path("add-to-cart/", views.add_to_cart, name="cart-add"),
    path("remove-from-cart/<int:pk>/", views.remove_from_cart, name="remove-from-cart"),
    path(
        "remove-from-cart/all/",
        views.remove_all_items_from_cart,
        name="remove-all-from-cart",
    ),
    path("cart/", views.get_cart, name="get-cart"),
    path("<int:pk>/", views.get_order_by_id, name="get-order-by-id"),
]
