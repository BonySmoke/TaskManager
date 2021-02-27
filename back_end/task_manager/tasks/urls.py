from django.urls import path, include
from . import views
from .views import ListTasksView, GetComments, CreateComment
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tasks', ListTasksView, basename='task')

urlpatterns = [
    path('', views.home, name="tasks-home"),
    path('board-tasks/<str:username>/', ListTasksView.as_view({'get':'list'})),
    path('board-tasks-comments/<int:task_id>', GetComments.as_view()),
    path('board-tasks-comments/create', CreateComment.as_view()),
    path("", include(router.urls))
]