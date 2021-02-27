from django.db import models
from django.conf import settings
# from django.contrib.auth.models import User
from django.conf import settings
from users.models import Board

User = settings.AUTH_USER_MODEL

class Task(models.Model):

    PRIORITIES = [
        ('Urgent', 'Urgent'),
        ('Low', 'Low'),
        ('High', 'High'),
        ('Normal', 'Normal'),
    ]
    ETA = [
        ('24h', '24h'),
        ('48h', '48h'),
        ('48+', '48+')
    ]
    STATUS = [
        ('ToDo', 'ToDo'),
        ('In progress', 'In progress'),
        ('On hold', 'On hold'),
        ('Done', 'Done'),
    ]


    user =          models.ForeignKey(User, related_name='tasks', null=True, on_delete=models.CASCADE)
    subject =       models.CharField(max_length=100, null=True, blank=True)
    description =   models.TextField(null=True, blank=True)
    creation_date = models.DateTimeField(auto_now=True)
    priority =      models.CharField(max_length=32 ,choices=PRIORITIES, default='normal')
    avarage_ETA =   models.CharField(max_length=32, choices=ETA, default='24h')
    status =        models.CharField(max_length=32, choices=STATUS, default='ToDo')
    board =         models.ForeignKey(Board, null=True, blank=True, related_name='board', on_delete=models.CASCADE)
    comments =      models.ManyToManyField('Comment', related_name='comments', blank=True)

    def __str__(self):
        return f'{self.subject} -> {self.user}'

class Comment(models.Model):

    user =          models.ForeignKey(User, related_name='comments', null=True, on_delete=models.CASCADE)
    task =          models.ForeignKey('Task', on_delete=models.CASCADE)
    description =   models.CharField(max_length=500)
    likes =         models.ManyToManyField(User, related_name='comment_likes', blank=True)
    date_posted =   models.DateTimeField(auto_now_add=True)
    last_edited =   models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description