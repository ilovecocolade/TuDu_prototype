from django.urls import path
from . import views
from .forms import UserLoginForm

app_name = 'main'


urlpatterns = [

    path('', views.home, name='home'),
    path('logout/', views.user_logout, name='logout'),
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
    path('test/', views.test, name='test'),

]