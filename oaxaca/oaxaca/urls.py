from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import PermissionGroups
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'@me', PermissionGroups, basename="Permissions")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('menu/', include('menu.urls')),
    path('orders/', include('orders.urls')),
    path('' , include(router.urls)),
    path('users/', include('accounts.urls')),
]