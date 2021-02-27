#django
from django.db import models
from django.db.models.signals import pre_save, post_save
from .utils import unique_key_id_generator
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect
# Pillow
from PIL import Image

User = settings.AUTH_USER_MODEL

class Board(models.Model):
    key =           models.CharField(max_length=20, blank=True)
    title =         models.CharField(max_length=100, default=None)
    creation_date = models.DateTimeField(auto_now=True)
    creator =       models.ForeignKey(settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE)
    members =       models.ManyToManyField(User, related_name="board_members", blank=True)
    image =         models.ImageField(default="default_board.png", upload_to="board_pics/")

    def __str__(self):
        return f'{self.title}'

    # def save(self, *args, **kwargs):
    #     '''
    #     Resize the image to 300 px
    #     '''
    #     super(Board, self).save(*args, **kwargs)
    #     img = Image.open(self.image.path)

    #     if img.height > 300 or img.width > 300:
    #         output = (300, 300)
    #         img.thumbnail(output)
    #         img.save(self.image.path)

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
