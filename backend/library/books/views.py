from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from users.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework.authentication import TokenAuthentication



def testing(request):

    users = User.objects.all()
    print(users)
    return HttpResponse("test")


class UserViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)           # <-- And here

    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

