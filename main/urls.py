from django.urls import path
from . import views
from .forms import UserLoginForm

app_name = 'main'


urlpatterns = [

    path('', views.home, name='home'),
    path('logout/', views.user_logout, name='logout'),
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
    path('ajax/populate_sub_categories/', views.populate_sub_categories, name='populate_sub_categories'),
    path('test/', views.test, name='test'),  # TEST HTML FILE
    path('test2/', views.test2, name='test2'),  # SECOND TEST HTML FILE

]