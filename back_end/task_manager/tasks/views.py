#django
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.db.models import Q
# rest framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
# Models
from .models import Task
from users.models import Profile, Board
#serializers
from .serializers import TaskSerializer, TaskCreateSerializer

from rest_framework.generics import ListAPIView

#testing function that doesn't mean anything for the program
def home(request):
    query = Task.objects.all()
    user = request.user
    user_b = Profile.objects.get(user=user)
    a = [item.key for item in user_b.boards.all()]
    print(a)
    if len(a):
        query = query & Task.objects.filter(board__key__in=a)
    print(query)
    return HttpResponse("<h1>Hello Django</h1>")

class ListTasksView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskCreateSerializer

    def get_queryset(self, **kwargs):
        '''
        Checks the current user and finds all the boards associated with them
        Then, filters the tasks by all the found boards
        If the user didn't select a board when creating a task, the filter will
        find the associated tasks without the board
        '''
        try:
            if self.kwargs['username']:
                user_board = Profile.objects.get(user__username=self.kwargs['username'])
                #adds the board keys to the array
                boards = [item.key for item in user_board.boards.all()]
                if len(boards):
                    self.queryset = self.queryset & \
                    Task.objects.filter(Q(board__key__in=boards) | \
                    Q(board=None) & Q(user__username=self.kwargs['username']))
                return self.queryset
            else:
                return self.queryset
        except Exception:
            return self.queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by('-creation_date')
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def create(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
