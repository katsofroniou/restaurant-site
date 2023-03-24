from django.apps import AppConfig

"""Accounts configuration"""
class AccountsConfig(AppConfig):
   """
   AppConfig for the 'accounts' app.

   Sets the default auto field to use a BigAutoField for compatibility with databases that
   support big integers.
   """
   
   default_auto_field = 'django.db.models.BigAutoField'
   name = 'accounts'
