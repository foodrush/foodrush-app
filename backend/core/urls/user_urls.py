from django.urls import path
from ..views import user_views as views

urlpatterns = [
    path("", views.get_users, name="users"),
    path("<int:pk>", views.get_user, name="user"),
    path("login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register-customer/", views.register_customer, name="register-user"),
    path("register-business/", views.register_business, name="register-business"),
    path("profile/", views.get_logged_in_user_profile, name="user-logged-in-profile"),
    path(
        "business-profile/",
        views.get_logged_in_business_profile,
        name="business-logged-in-profile",
    ),
    path(
        "customer-profile/",
        views.get_logged_in_customer_profile,
        name="customer-logged-in-profile",
    ),
    path("businesses/", views.get_business_profiles, name="businesses"),
    path(
        "business-profile/products/",
        views.get_business_profiles,
        name="products-from-logged-in-business",
    ),
    path("businesses/<int:pk>/", views.get_business_profile, name="business-profile"),
    path("customers/", views.get_customer_profiles, name="customers"),
    path("customers/<int:pk>/", views.get_customer_profile, name="customer-profile"),
    path("edit-customer", views.edit_customer, name="edit-customer"),
    path("edit-business", views.edit_business, name="edit-business-profile"),
    # path("profile-customer/", views.get_customer_profile, name="customer-profile"),
    # path("profile-business/", views.get_business_profile, name="business-profile"),
]
