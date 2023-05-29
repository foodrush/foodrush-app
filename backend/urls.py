"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


# from rest_framework.schemas import get_schema_view
# from rest_framework.documentation import include_docs_urls
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

# schema_view = get_schema_view(title="FoodRush API")
# https://appliku.com/post/django-rest-framework-swagger-openapi-tutorial#whats-the-difference-between-swagger-and-openapi


routes = getattr(settings, "REACT_ROUTES", [])
react_routes = getattr(settings, "REACT_ROUTES", [])

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("core.urls.product_urls")),
    path("api/users/", include("core.urls.user_urls")),
    path("api/orders/", include("core.urls.order_urls")),
    # path("", TemplateView.as_view(template_name="index.html")),
    # url(r"^(%s)?$" % "|".join(routes), TemplateView.as_view(template_name="index.html")),
    # documentation
    # # path("api/schema/", schema_view),
    # path("api/docs/", include_docs_urls(title="FoodRush API")),
    # path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # path(
    # "api/schema/swagger-ui/",
    # SpectacularSwaggerView.as_view(url_name="schema"),
    # name="swagger-ui",
    # ),
    # path(
    # "api/schema/redoc/",
    # SpectacularRedocView.as_view(url_name="schema"),
    # name="redoc",
    # ),
    re_path("", TemplateView.as_view(template_name="index.html")),
]
# for route in react_routes:
#     urlpatterns += [
#         path("{}".format(route), TemplateView.as_view(template_name="index.html"))
#     ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
