from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    user =          models.OneToOneField(User, related_name='users', null=True, on_delete=models.CASCADE)
    job_title =     models.CharField(max_length=50, null=True, blank=True, default="undefined")

    def __str__(self):
        return f'Profile: {self.user}'
