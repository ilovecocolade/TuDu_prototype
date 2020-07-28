from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import SubCategories, Locations
from django.http import HttpResponse



class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), label='Username or Email')
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        authorise = None
        if not username and not password:
            raise forms.ValidationError('Please enter your login details.')
        if '@' in str(username):
            try:
                User.objects.get(email=username).username
            except:
                raise ValidationError('Sorry, that login was invalid. Please try again.')
        else:
            authorise = authenticate(username=username, password=password)
        if authorise is None:
            raise ValidationError('Sorry, that login was invalid. Please try again.')
        return self.cleaned_data

    def can_login(self, request):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        if '@' in str(username):
            username = User.objects.get(email=username).username
        authorise = authenticate(username=username, password=password)
        return authorise


class CreateAccountForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput())
    email = forms.EmailField(required=True)
    password1 = forms.CharField(widget=forms.PasswordInput(), label='Password')
    password2 = forms.CharField(widget=forms.PasswordInput(), label='Confirm password')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def save(self, commit=True):
        
        username=self.clean_username()
        email=self.clean_email()
        password=self.clean_password2()

        if commit:
            # user.save()
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
            return user

    def clean_username(self):
        username = self.cleaned_data['username'].lower()
        try:
            User.objects.get(username=username)
        except:
            return username
        raise forms.ValidationError('Sorry, that username is already in use.')

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        try:
            User.objects.get(email=email)
        except:
            return email
        raise forms.ValidationError('Sorry, there is already an accocunt associated with that email.')

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if (password1 and password2) and (password1 != password2):
            raise forms.ValidationError('Passwords do not match.')
        return password2


class CreateLocationForm(forms.Form):

    # create ID for location ? id = forms.UUIDField()
    uploader = forms.CharField(widget=forms.TextInput(attrs={'id': 'uploaderEntry'}))
    primary_sub_category = forms.CharField(widget=forms.TextInput(attrs={'id': 'primarySubCatEntry'}))
    secondary_sub_categories = forms.CharField(widget=forms.TextInput(attrs={'id': 'secondarySubCatEntry'}), required=False)
    name = forms.CharField(widget=forms.TextInput(attrs={'id': 'nameEntry'}))
    location = forms.CharField(widget=forms.TextInput(attrs={'id': 'locationEntry'}))
    nearest_access = forms.CharField(widget=forms.TextInput(attrs={'id': 'nearestAccessEntry'}), required=False)
    description = forms.CharField(widget=forms.TextInput(attrs={'id': 'descriptionEntry'}), required=False)
    photo = forms.FileField(widget=forms.FileInput(attrs={'id': 'photoEntry'}), required=False)
    # need upload_date for loaction ? upload_date = forms.CharField(widget=forms.TextInput(attrs={'id': 'uploaderEntry'}))

    class Meta:
        model = Locations
    
    def save(self, commit=True, photo_file=None):

        uploader = self.clean_uploader()
        primary_sub_category = self.clean_primary_sub_category()
        secondary_sub_categories = self.clean_secondary_sub_categories()
        name = self.clean_name()
        location = self.clean_location()
        nearest_access = self.clean_nearest_access()
        description = self.clean_description()
        photo = photo_file  # self.clean_photo()

        if commit:
            created_location = Locations.objects.create(uploader=uploader, primary_sub_category=primary_sub_category, name=name, location=location, nearest_access=nearest_access, description=description)
            [created_location.secondary_sub_categories.add(SubCategories.objects.get(name=sub_cat_name)) for sub_cat_name in secondary_sub_categories]
            return created_location

    def clean_uploader(self):
        uploader = User.objects.get(username=self.cleaned_data['uploader'])
        return uploader

    def clean_primary_sub_category(self):
        primary_sub_category = SubCategories.objects.get(name=self.data['primary_sub_category'])
        return primary_sub_category

    def clean_secondary_sub_categories(self):
        secondary_sub_categories = self.cleaned_data['secondary_sub_categories']
        if ',' in secondary_sub_categories:
            secondary_sub_categories = (secondary_sub_categories[:secondary_sub_categories.find(',')], secondary_sub_categories[(secondary_sub_categories.find(',')+1):])
        else:
            secondary_sub_categories = (secondary_sub_categories)
        return secondary_sub_categories

    def clean_name(self):
        name = self.cleaned_data['name']
        return name
    
    def clean_location(self):
        location = self.cleaned_data['location']
        return location

    def clean_nearest_access(self):
        nearest_access = self.cleaned_data['nearest_access']
        return nearest_access
    
    def clean_description(self):
        description = self.cleaned_data['description']
        return description
    
    def clean_photo(self):
        photo = self.cleaned_data['photo']
        return photo
