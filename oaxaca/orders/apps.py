from django.apps import AppConfig

class OrdersConfig(AppConfig):
    """
    Configuration class for the 'orders' Django app.

    Attributes:
        default_auto_field (str): The default field type for auto-generated IDs in the app's models
        name (str): The name of the app
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'orders'