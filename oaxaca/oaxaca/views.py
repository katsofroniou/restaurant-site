"""
A viewset class that returns the authenticated user's username and group affiliations.

The endpoint can only be accessed by authenticated users, as specified in the 
`permission_classes` attribute of the class. The `list` method returns a JSON 
response containing the user's username and the groups they are a member of. 
"""

from rest_framework.response import Response
from rest_framework import permissions, viewsets

class PermissionGroups(viewsets.ViewSet):
    """
    Returns a JSON response containing the authenticated user's username and
    the groups they are a member of.

    Parameters:
        - request (HttpRequest): The request object passed in by Django.

    Returns:
        - A JSON response containing the authenticated user's username and group affiliations
    """
    
    # Only authenticated people can access the api view
    permission_classes = [permissions.IsAuthenticated]
    
    # Returns that the user is authenticated, their username, and the groups that they are a part of
    def list(self, request):
        return Response({"status": "Authorised", "user": request.user.username, "groups": request.user.groups.all().values()})