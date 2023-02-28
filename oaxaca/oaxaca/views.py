from rest_framework.response import Response
from rest_framework import permissions, viewsets

class PermissionGroups(viewsets.ViewSet):
    # Only authenticated people can access the api view
    permission_classes = [permissions.IsAuthenticated]
    
    # Returns that the user is authenticated, their username, and the groups that they are a part of
    def list(self, request):
        return Response({"status": "Authorised", "user": request.user.username, "groups": request.user.groups.all().values()})