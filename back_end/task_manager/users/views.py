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
                print(boards)
                if len(boards):
                    print(boards)
                    self.queryset = self.queryset & Board.objects.filter(key__in=boards)
                    return self.queryset
                else:
                    return []
            else:
                return []
        except Exception:
            return None
        
    def list(self, request, *args, **kwargs):
        if self.get_queryset():
            queryset = self.get_queryset().order_by('-creation_date')
            serializer = BoardSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"message":"empty"})
            

    def create(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            profile = Profile.objects.get(user=request.data['creator'])
            print(profile.user)
            if serializer.is_valid(self):
                serializer.save()
                board = Board.objects.filter(creator=request.data['creator']).last()
                profile.boards.add(board)
                return redirect('/users/boards')
            else:
                return Response(serializer.errors)
        except Exception as e:
            return Response({'error':e.args})

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
        profile = get_object_or_404(Profile, user=id)
        profile.boards.add(board)
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

@api_view(['GET', 'POST'])
def change_board_owner(request, key, old_owner, new_owner):
    '''
    changes the owner of a board
    '''
    try:
        board = get_object_or_404(Board, key=key)
        new_owner_user = get_object_or_404(User, id=new_owner)
        new_owner_profile = get_object_or_404(Profile, user=new_owner_user)
        if board.creator.id == old_owner:
            #add a board to the profile of the new owner
            new_owner_profile.boards.add(board)
            #update the board owner
            board.creator = new_owner_user
            #add the new owner to the members if they are not there already
            exists = [member for member in board.members.all() if member.id == new_owner_user.id]
            if not len(exists):
                board.members.add(new_owner_user)
            board.save()
            return Response({'message':f'The {board.title} Board owner has been changed.'})
        else:
            print(board.creator, old_owner)
            return Response({'message':f'The {board.title} Board owner could not be updated'})
    except Exception as e:
        return Response({'message':f'An {e.args} error occurred while processing your request.'})

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