from django.urls import path, include
from . import views
from .views import ListTasksView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('tasks', ListTasksView, basename='task')

urlpatterns = [
    path('', views.home, name="tasks-home"),
    path("", include(router.urls))
]