from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import UserLoginForm, CreateAccountForm
from django.contrib import messages
from django import forms
from .models import Categories, SubCategories
from django.http import JsonResponse


# Create your views here.


# TEST VIEWS FOR HTML FILES
def test(request):
    return render(request, 'main/test.html', context={'Categories': Categories.objects.all, 
                                                      'SubCategories': SubCategories.objects.all})

def test2(request):
    return render(request, 'main/test2.html')


def populate_sub_categories(request):
    messages.info(request, 'populate')
    category = request.POST.get('category')
    messages.info(request, str(category))
    data = {
        'status': 200,
        'sub_categories': SubCategories.objects.filter(category=str(category))
    }
    return JsonResponse(data)



def home(request):
    return render(request=request, template_name='main/index.html')


def register(request):
    if request.method == "POST":
        form = CreateAccountForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account Created: {username}')
            login(request, user)
            messages.info(request, f'Logged in: {username}')
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
                messages.info(request, f'Logged in: {user.username}')
                return redirect('main:home')
    else:
        form = UserLoginForm()
    return render(request, 'main/login.html', {'form': form})
            

def user_logout(request):
    logout(request)
    messages.info(request, 'Log out successful')
    return redirect('main:home')
