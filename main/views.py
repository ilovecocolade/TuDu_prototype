from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import UserLoginForm, CreateAccountForm, CreateLocationForm
from django.contrib import messages
from django import forms
from .models import Categories, SubCategories
from django.http import JsonResponse


# Create your views here.


# TEST VIEWS FOR HTML FILES
def test(request):
    categories = {}
    for category in Categories.objects.all():
        sub_categories = {}
        [sub_categories.update({sub_category.name: str(sub_category.icon)}) for sub_category in SubCategories.objects.filter(category=category.name)]
        categories.update({category.name: sub_categories})

    return render(request, 'main/test.html', context={'categories': categories})


def test2(request):
    return render(request, 'main/test2.html')


def test3(request):
    categories = {}
    for category in Categories.objects.all():
        sub_categories = {}
        [sub_categories.update({sub_category.name: str(sub_category.icon)}) for sub_category in SubCategories.objects.filter(category=category.name)]
        categories.update({category.name: sub_categories})

    context = {'categories': categories}

    if request.user.is_authenticated:
        new_location = CreateLocationForm(request.POST, request.FILES)
        if new_location.is_valid():
            new_location = new_location.save(photo_file=request.FILES.get('photo'))
            messages.success(request, f'Location Created: {new_location.name}')
        else:
            new_location = CreateLocationForm()
        context.update({'add_location_form': new_location})

    return render(request, 'main/test3.html', context=context)


'''def populate_sub_categories(request):
    category = request.GET.get('category', None)
    sub_categories = {}
    [sub_categories.update({sub_category.name: str(sub_category.icon)}) for sub_category in SubCategories.objects.filter(category=category)]
    data = {
        'sub_categories': sub_categories
    }
    return JsonResponse(data)'''



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
