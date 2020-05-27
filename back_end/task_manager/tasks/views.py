#django
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.models import User
# rest framework
from rest_framework.response import Response
from rest_framework import viewsets
# Models
from .models import Task
#serializers
from .serializers import TaskSerializer, TaskCreateSerializer

from rest_framework.generics import ListAPIView

def home(request):
    tasks = Task.objects.last()
    user = request.user
    print(user)
    print(type(tasks.priority))
    return HttpResponse("<h1>Hello Django</h1>")

class ListTasksView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskCreateSerializer

    def list(self, request):
        queryset = self.get_queryset().order_by('-creation_date')
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        task = get_object_or_404(queryset, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def create(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.data)
        return Response(serializer.data)


