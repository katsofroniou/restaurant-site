"""
List of URL patterns for the 'accounts' app.

The 'urlpatterns' list maps URLs to view functions or classes. In this case, it defines a single URL pattern
that corresponds to the 'UserCreate' view, which is used to handle user creation requests via a RESTful API.
The 'name' argument specifies a name for this URL pattern, which can be used to reverse-lookup the URL.

Routes:
    - /api - URL pattern for creating a user via an API request.
"""

from django.urls import path
from .views import UserCreate

urlpatterns = [
    path('api', UserCreate.as_view(), name='account-create'),
]
