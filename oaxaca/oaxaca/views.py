from rest_framework.response import Response
from rest_framework import permissions, viewsets

class PermissionGroups(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    
    def list(self, request):
        return Response({"status": "Authorised", "user": request.user.username, "groups": request.user.groups.all().values()})