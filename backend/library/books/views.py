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
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import BooksSerializers 
from rest_framework.response import Response
from .models import BooksAdded

def testing(request):
    users = User.objects.all()
    print(users)
    return HttpResponse("test")


# testing purposes
def funbased(request):
    obj = []
    queryset = BooksAdded.objects.all()
    for book in queryset:
       obj.append(BooksSerializers(book).data)
    return JsonResponse(obj,safe=False)


class BooksView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = BooksAdded.objects.all()
    serializer_class = BooksSerializers

    def filter_queryset(self, queryset,**kwargs):
        print(kwargs)
        queryset = self.get_queryset().filter(user_id=self.request.user.id).order_by("book_state")
        return  queryset

  
class BookView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = BooksAdded.objects.all()
    lookup_field = "book_id"
    serializer_class = BooksSerializers


 

class UserViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)           # <-- And here
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

