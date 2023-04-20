from django.urls import path
from ..views import product_views as views

urlpatterns = [
    path("", views.get_products, name="products"),
    path("<int:pk>/", views.get_product, name="product"),
    path("add-product/", views.add_product, name="add-product"),
    path(
        "businesses/<int:pk>/",
        views.get_products_from_business,
        name="get-products-from-business",
    ),
    path(
        "businesses/<int:bpk>/<int:ppk>/",
        views.get_product_from_business,
        name="get-a-product-from-business",
    ),
    path("add-product/", views.add_product, name="add-product"),
]
