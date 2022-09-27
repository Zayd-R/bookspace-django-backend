from dataclasses import fields
from pyexpat import model
from urllib import request
from django.contrib.auth.models import User
from .models import BooksAdded
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id",'username', 'email', 'first_name','last_name']



class BooksSerializers(serializers.ModelSerializer):
    class Meta:
        model = BooksAdded
        fields = ['book_title',"user_id", "book_id", "book_state", "book_image",'added']
  