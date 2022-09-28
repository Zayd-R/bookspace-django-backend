from email.policy import default
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
'''
class BooksToRead(models.Model):
    user_id = models.ForeignKey("User", on_delete=models.CASCADE,related_name="booksToRead")
    book_id = models.TextField()
    book_title = models.TextField
    book_image = models.Image()

class ReadBooks(models.Model):
    user_id = models.ForeignKey("User", on_delete=models.CASCADE,related_name="booksToRead")
    book_id = models.TextField()
    book_title = models.TextField
    book_image = models.Image()

class BooksInProgress(models.Model):
    user_id = models.ForeignKey("User", on_delete=models.CASCADE,related_name="booksToRead")
    book_id = models.TextField()
    book_title = models.TextField
    book_image = models.Image()

///////////////////////////////////////////////////////

'''

class BooksAdded(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,related_name="booksToRead")
    book_title = models.TextField(default="No title")
    book_state =  models.TextField(default="No title")
    book_id = models.TextField(unique=True)
    book_image = models.TextField(blank=True)
    added = models.DateTimeField(auto_now_add=True)
    review = models.IntegerField(blank=True, default=0)

    
    class Meta:
        unique_together = ('user_id', 'book_id'),
    def __str__(self):
        return self.book_title
