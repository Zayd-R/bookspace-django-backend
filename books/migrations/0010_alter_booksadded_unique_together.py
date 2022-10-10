# Generated by Django 4.1.1 on 2022-10-09 10:16

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('books', '0009_alter_booksadded_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='booksadded',
            unique_together={('user_id', 'book_id')},
        ),
    ]