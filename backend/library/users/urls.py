from django.urls import path
from .views import UserDetailAPI, RegisterUserAPIView, LogoutView

urlpatterns = [
    path("get-details/<int:id>/",UserDetailAPI.as_view()),
    path('register/',RegisterUserAPIView.as_view()),
    path('logout/',LogoutView.as_view()),

]