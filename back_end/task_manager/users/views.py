#django
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Profile, Board
from .serializers import ProfileSerializer, UserSerializer, BoardSerializer
#django-rest-framework
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response


def home(request):
    # user_board = UserBoard.objects.first()
    # print("Info from User views.py")
    # if user_board.user:
    #     print(user_board.board)
    #     print(user_board.user.all())
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