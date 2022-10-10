"""library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from django.views.generic import TemplateView


# Routers provide an easy way of automatically determining the URL conf.

urlpatterns = [
    path('admin/', admin.site.urls),
    path("books-api/", include("books.urls")),
    path("users/", include("users.urls")),
    path('browsable-auth/', include("rest_framework.urls"), name='api_token_auth'), 
    re_path('',TemplateView.as_view(template_name='index.html'))
]