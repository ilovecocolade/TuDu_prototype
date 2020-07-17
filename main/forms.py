from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User



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
