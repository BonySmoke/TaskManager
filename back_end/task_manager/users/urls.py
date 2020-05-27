from django.urls import path, include
from .views import ProfileViewSet, UsersViewSet, GetUser, home
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('users', UsersViewSet, basename='user')

urlpatterns = [
    path('usertest/', home, name='usertest'),
    path("", include(router.urls)),
    path('getuser/<token>', GetUser.as_view(), name='getuser'),
]