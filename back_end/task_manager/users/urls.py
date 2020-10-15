from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import (
    ProfileViewSet, 
    UsersViewSet, 
    BoardViewSet, 
    GetUser, 
    home, join_board, leave_board)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('users', UsersViewSet, basename='user')
router.register('boards', BoardViewSet, basename='board')

urlpatterns = [
    path('usertest/', home, name='usertest'),
    path("", include(router.urls)),
    path('getuser/<token>', GetUser.as_view(), name='getuser'),
    path('joinboard/<str:key>/<int:id>', join_board, name='join-board'),
    path('leaveboard/<str:key>/<int:id>', leave_board, name='leave-board'),
    path('board-users/<str:username>', BoardViewSet.as_view({'get':'list'}))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)