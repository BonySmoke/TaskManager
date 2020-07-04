from rest_framework import serializers
from django.contrib.auth.models import User
from users.serializers import UserSerializer, ProfileSerializer
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    #connects the User model fields to the TaskSerializer
    user = UserSerializer()
    
    class Meta:
        model = Task
        fields = ("user", "id", "subject", "description",
                "creation_date", "priority", "avarage_ETA", "status")

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("user", "id", "subject", "description",
                "creation_date", "priority", "avarage_ETA", "status", "board")