#django
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
#django-rest-framework
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

def home(request):
    user = Profile.objects.get(job_title='plumber')
    print(user.user.last_name)
    return HttpResponse('<h1>Hello from users</h1>')

#ViewSet to get all the users
class ProfileViewSet(viewsets.ModelViewSet):
    
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UsersViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUser(APIView):

    permission_classes = [AllowAny]
    queryset = Token

    def get(self, request, token):
        try:
            queryset = Token.objects.get(key=token).user
            user = get_object_or_404(User, username=queryset)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except Exception:
            print("The token hasn't been found")
            pass