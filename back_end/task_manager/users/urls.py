from django.urls import path, include
from .views import ProfileViewSet, UsersViewSet, BoardViewSet, GetUser, home
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('users', UsersViewSet, basename='user')
router.register('boards', BoardViewSet, basename='board')

urlpatterns = [
    path('usertest/', home, name='usertest'),
    path("", include(router.urls)),
    path('getuser/<token>', GetUser.as_view(), name='getuser'),
]