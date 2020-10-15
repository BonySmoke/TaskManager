#django
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.models import User
from .models import Profile, Board
from .serializers import ProfileSerializer, UserSerializer, BoardSerializer
#django-rest-framework
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view


def home(request):
    board = Board.objects.last()
    board.members.add(3)
    return HttpResponse("<h1>User Test</h1>")

#ViewSet to get all the users
class ProfileViewSet(viewsets.ModelViewSet):
    
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UsersViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class BoardViewSet(viewsets.ModelViewSet):

    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def get_queryset(self, **kwargs):
        try:
            if self.kwargs['username']:
                user = Profile.objects.get(user__username=self.kwargs['username'])
                boards = [item.key for item in user.boards.all()]
                if len(boards):
                    print(boards)
                    self.queryset = self.queryset & Board.objects.filter(key__in=boards)
                return self.queryset
            else:
                return []
        except Exception:
            return None
        
    def list(self, request, *args, **kwargs):
        if self.get_queryset():
            queryset = self.get_queryset().order_by('-creation_date')
            serializer = BoardSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message":"no boards were found"})
            

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(self):
            serializer.save()
            return redirect('/users/boards')
        else:
            return Response(serializer.errors)

@api_view(['GET', 'POST'])
def join_board(request, key, id):
    '''
    adds a user to the board if it's not there
    '''
    board = get_object_or_404(Board, key=key)
    user = get_object_or_404(User, id=id)
    exists = [i for i in board.members.all() if i.id == user.id]
    if not len(exists):
        board.members.add(user.id)
        return Response({'message': "the user has been added"})
    return Response({'message': 'the user is already in the board'})

@api_view(['GET', 'POST'])
def leave_board(request, key, id):
    '''
    removes a member from a board if such exists
    destroys the board if the creator is leaving
    '''
    board = get_object_or_404(Board, key=key)
    user = get_object_or_404(User, id=id)
    exists = [i for i in board.members.all() if i.id == user.id]
    if len(exists):
        if user.id == board.creator.id:
            board.delete()
            message = f'{board.title} has been removed'
            return Response({'message': message})
        board.members.remove(user.id)
        return Response({'message': "the user has been removed"})
    return Response({'message': 'the user is not in the board'})

class GetUser(APIView):

    permission_classes = [AllowAny]
    queryset = Token

    def get(self, request, token):
        try:
            #finds the user by the provided token from the front-end
            queryset = Token.objects.get(key=token).user
            user = get_object_or_404(Profile, user__username=queryset)
            serializer = ProfileSerializer(user)
            return Response(serializer.data)
        except Exception:
            print("The token hasn't been found")
            pass