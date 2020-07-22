from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import UserLoginForm, CreateAccountForm
from django.contrib import messages
from django import forms


# Create your views here.


def home(request):
    return render(request=request, template_name='main/index.html')


def register(request):
    if request.method == "POST":
        form = CreateAccountForm(request.POST)
        if form.is_valid():
            user = form.save()
            # username = form.cleaned_data.get('username')
            # successful account creation message
            # login message
            login(request, user)
            return redirect('main:home')
    else:
        form = CreateAccountForm()
    return render(request=request, template_name='main/register.html', context={'form': form})


def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.can_login(request)
            if user:
                login(request, user)
                # successful login message
                return redirect('main:home')
    else:
        form = UserLoginForm()
    return render(request, 'main/login.html', {'form': form})
            

def user_logout(request):
    logout(request)
    # logout message
    return redirect('main:home')
