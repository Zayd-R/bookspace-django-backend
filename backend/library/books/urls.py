from django.urls import path, include
from . import views



urlpatterns = [
     path("testing/", views.testing, name="testing"),
     path("users/", views.UserViewSet.as_view(), name="testing"),


]
