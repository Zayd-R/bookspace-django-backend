from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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
    book_id = models.TextField(unique=False)
    book_image = models.TextField(blank=True)
    added = models.DateTimeField(auto_now_add=True)
    review = models.IntegerField(blank=True, default=0)

    
    class Meta:
        unique_together = ('user_id', 'book_id'),
    def __str__(self):
        return self.book_title

class Comments(models.Model):
    parentId = models.IntegerField(null=True,default=None)
    book = models.ForeignKey(BooksAdded, on_delete=models.CASCADE, related_name="comments")
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commenter")
    comment = models.TextField()
    date_posted = models.DateTimeField(default = timezone.now)
    children = models.IntegerField(null=True,default=None,blank=True)
    
    def __str__(self):
        return self.commenter.username
    def serialize(self):
        return {
            "id": self.id,
            "parentId": self.parentId,
            "children":self.children,
            "commenter": str(self.commenter.username),
            "comment": str(self.comment),
            "book_id": str(self.book.book_id),
            "review": self.book.review,
            "time": self.date_posted
               }