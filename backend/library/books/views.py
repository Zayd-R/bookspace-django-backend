from ast import Return
from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from users.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated , BasePermission, SAFE_METHODS  # <-- Here
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import BooksSerializers 
from rest_framework.response import Response
from .models import BooksAdded, Comments
from .permissions import AuthorAllStaffAllButEditOrReadOnly
from rest_framework.decorators import permission_classes, api_view


# testing purposes
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

@api_view(('POST','GET'))
@permission_classes((IsAuthenticated | ReadOnly, ))
def comments(request, book_id):
   if request.method == 'POST':
       data = json.loads(request.body)
       user = User.objects.get(pk=request.user.id)
       book = BooksAdded.objects.get(book_id=book_id)
       Comments.objects.create(book=book, commenter=user, comment=data.get("comment"))
       comments = Comments.objects.filter(book__book_id=book_id)
       print(data,request.user.id, book_id,'----------------------------------')
       return JsonResponse({"success":"sucess",
                            "comments": [comment.serialize() for comment  in comments]})



   comments = Comments.objects.filter(book__book_id=book_id)
   comments_serialized = [comment.serialize() for comment  in comments]
   return JsonResponse(comments_serialized, safe=False)
    # return JsonResponse(,safe=False)




class BooksView(generics.ListCreateAPIView):
    permission_classes = (AuthorAllStaffAllButEditOrReadOnly,)
    queryset = BooksAdded.objects.all()
    serializer_class = BooksSerializers
    

    def filter_queryset(self, queryset,**kwargs):
        queryset = self.get_queryset().filter(user_id=self.request.user.id).order_by("book_state")
        return  queryset

  


class TestView(generics.ListAPIView):
    permission_classes = (AuthorAllStaffAllButEditOrReadOnly,)
    queryset = BooksAdded.objects.all()
    serializer_class = BooksSerializers
    

    def filter_queryset(self, queryset,**kwargs):
        books_state = self.kwargs['state']
        queryset = self.get_queryset().filter(user_id=self.request.user.id, book_state=books_state).order_by("-added")
        return  queryset






class BookView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly]

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

