from rest_framework import permissions

class AuthorAllStaffAllButEditOrReadOnly(permissions.BasePermission):

    edit_methods = ("POST","PUT", "PATCH")

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        if obj.user_id.id == request.user.id:
            return True

        if request.user.is_staff and request.method not in self.edit_methods:
            return True

        return False