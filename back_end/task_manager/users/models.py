#django
from django.db import models
from django.db.models.signals import pre_save
from .utils import unique_key_id_generator
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Board(models.Model):
    key =           models.CharField(max_length=20, blank=True)
    title =         models.CharField(max_length=100, default=None)
    creation_date = models.DateTimeField(auto_now=True)
    creator =       models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}'


def pre_save_create_board_key(sender, instance, *args, **kwargs):
    if not instance.key:
        instance.key = unique_key_id_generator(instance)

pre_save.connect(pre_save_create_board_key, sender=Board)

class Profile(models.Model):
    user =          models.OneToOneField(User, related_name='users', null=True, on_delete=models.CASCADE)
    job_title =     models.CharField(max_length=50, null=True, blank=True, default="undefined")
    boards =        models.ManyToManyField(Board, related_name='boards', blank=True)

    def __str__(self):
        return f'Profile: {self.user}'
