from django.urls import path
from ..views import user_views as views

urlpatterns = [
    path("", views.get_users, name="users"),
    path("login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register-customer/", views.register_user, name="register-user"),
    path("register-business/", views.register_business, name="register-business"),
    path("profile/", views.get_user_profile, name="user-profile"),
    path("businesses/", views.get_business_profiles, name="user-profile"),
    path("businesses/<int:pk>/", views.get_business_profile, name="business"),
    path("customers/", views.get_customer_profiles, name="user-profile"),
    path("customers/<int:pk>/", views.get_customer_profile, name="customer-profile"),
    path("profile-customer/", views.get_customer_profile, name="customer-profile"),
    path("profile-business/", views.get_business_profile, name="business-profile"),
]
