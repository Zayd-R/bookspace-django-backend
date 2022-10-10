from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework import status

from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAuthenticated,)
  def get(self,request,*args,**kwargs):
    user = User.objects.get(id=kwargs['id'])
    serializer = UserSerializer(user)
    return Response(serializer.data)


class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer



class TokenObtainView(ObtainAuthToken):
  def post(self, request, *args, **kwargs):
    print(request, "---------------------------------")
    serializer = self.serializer_class(data=request.data,
                                        context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']              
    token, created = Token.objects.get_or_create(user=user)
    custom_response = {
            'token': token.key,
            'username': user.username,
            'user_id': user.id
        }
    return Response(custom_response)



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