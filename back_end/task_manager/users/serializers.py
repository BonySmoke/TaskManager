from rest_auth.registration.serializers import RegisterSerializer
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Board

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "email")

class BoardSerializer(serializers.ModelSerializer):

    creator = UserSerializer()

    class Meta:
        model = Board
        fields = ('id','key', 'title', 'creator', 'members', 'image')

class BoardCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ('id','key', 'title', 'creator', 'members', 'image')

    def validate(self, data):
        print('data')
        print(data)
        user = Profile.objects.get(user=data['creator'])
        data['members'] = [user.user]
        return data

class ProfileSerializer(serializers.ModelSerializer):
    boards = BoardSerializer(many=True, read_only=True)
    user = UserSerializer()
    
    class Meta:
        model = Profile
        fields = ('user', 'job_title', 'boards')

class SignupSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        #overwrite the default user registration form
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        #create a user profile
        profile = Profile.objects.create(user=user)
        profile.save()
        return user