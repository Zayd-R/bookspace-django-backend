from ast import Return
from http.client import HTTPResponse
from urllib import request
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
from rest_framework import status


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
    #    for each user one review , if exist => update the review
       try:
            if Comments.objects.get(book=book, commenter=user, parentId=None):
                    Comments.objects.filter(book=book, commenter=user, parentId=None).update(book=book, commenter=user, comment=data.get("comment"))
                    updated = Comments.objects.get(book=book, commenter=user, parentId=None)
                    return JsonResponse({"comment":[updated.serialize()]}, safe=False)
       except:
        # if not exist create the new comment
            Comments.objects.create(book=book, commenter=user, comment=data.get("comment"))
            comments = Comments.objects.filter(book__book_id=book_id)
            return JsonResponse({"success":"sucess",
                                    "comments": [comment.serialize() for comment  in comments]})


# get all the comments for the book 
   comments = Comments.objects.filter(book__book_id=book_id)
   comments_serialized = [comment.serialize() for comment  in comments]
   return JsonResponse(comments_serialized, safe=False)
    # return JsonResponse(,safe=False)


#  get the review of the user
@api_view(('GET',))
@permission_classes((IsAuthenticated, ))
def Comment(request, book_id):
        try:
            user = User.objects.get(pk=request.user.id)
            book = BooksAdded.objects.get(book_id=book_id)
            comment = Comments.objects.get(book=book,commenter=user,parentId=None)
            print(Comments.objects.get(book=book,commenter=user,parentId=None), "---------------------------")

            return JsonResponse({"comment":comment.serialize()}, safe=False)
        except:
            return JsonResponse({},safe=False)

   


@api_view(('POST',))
@permission_classes((IsAuthenticated, ))
def Reply(request, book_id):
    data = json.loads(request.body)
    parentId = data.get("parentId")
    user = User.objects.get(pk=request.user.id)
    book = BooksAdded.objects.get(book_id=book_id)
    newcomment = Comments.objects.create(parentId=parentId, commenter=user,book=book, comment=data.get("comment"))
    return JsonResponse(newcomment.serialize(), safe=False)



class BooksView(generics.ListCreateAPIView):
    permission_classes = (AuthorAllStaffAllButEditOrReadOnly,)
    queryset = BooksAdded.objects.all()
    serializer_class = BooksSerializers
    

    def filter_queryset(self, queryset,**kwargs):
        queryset = self.get_queryset().filter(user_id=self.request.user.id).order_by("-added")
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
    # def filter_queryset(self, queryset):
    #     queryset = self.get_queryset().filter(user_id=self.request.user.id).order_by("-added")
    #     return  queryset
    def get_queryset(self):
        user = self.request.user.id
        newquery = self.queryset.filter(user_id=user)
        return newquery
    

class UserViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)           # <-- And here
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

