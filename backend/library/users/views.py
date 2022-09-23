from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework import status

from rest_framework import generics


class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAuthenticated,)
  def get(self,request,*args,**kwargs):
    print(kwargs['id'], "---------------------------------------------------------------------")

    user = User.objects.get(id=kwargs['id'])
    serializer = UserSerializer(user)
    return Response(serializer.data)

class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer

class LogoutView(APIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def delete(request, *args, **kwargs):
        request.user.auth_token.delete()
        data = {
        "message": "You have successfully logged out.",
        }
        return Response(data, status=status.HTTP_200_OK)