from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from core import views

urlpatterns = [
    path('', login_required(views.home), name='home'), 
]
