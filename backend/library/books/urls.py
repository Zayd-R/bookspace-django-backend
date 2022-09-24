from django.urls import path, include
from . import views



urlpatterns = [
     path("testing/", views.testing, name="testing"),
     path("users/", views.UserViewSet.as_view(), name="testing"),
     path("books/", views.BooksView.as_view(), name="books"),
     path("books/<str:book_id>", views.BookView.as_view(), name="book"),

     path("funbased/", views.funbased, name="funbased"),
 


]
