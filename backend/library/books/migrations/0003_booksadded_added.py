# Generated by Django 4.1.1 on 2022-09-27 16:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_alter_booksadded_unique_together_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='booksadded',
            name='added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]