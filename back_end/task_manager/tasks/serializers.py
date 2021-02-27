from rest_framework import serializers
from django.contrib.auth.models import User
from users.serializers import UserSerializer, ProfileSerializer, BoardSerializer
from .models import Task, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("user", "task", "description")

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

class TaskSerializer(serializers.ModelSerializer):
    #connects the other Serizliers to the TaskSerializer
    user = UserSerializer()
    board = BoardSerializer()
    comments = CommentSerializer()
    
    class Meta:
        model = Task
        fields = ("user", "id", "subject", "description",
                "creation_date", "priority", "avarage_ETA", "status", "board", "comments")

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("user", "id", "subject", "description",
                "creation_date", "priority", "avarage_ETA", "status", "board")