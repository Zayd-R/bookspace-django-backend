from django.urls import path, include
from . import views



urlpatterns = [
     path("users/", views.UserViewSet.as_view(), name="testing"),
     path("books/", views.BooksView.as_view(), name="books"),
     path("books/<str:book_id>", views.BookView.as_view(), name="book"),

     path("v1-comments/<str:book_id>", views.comments, name="comments"),
     path("v1-comments/comment/<str:book_id>", views.Comment, name="comment"),

     path("books/state/<str:state>", views.TestView.as_view(), name="testView"),


]
