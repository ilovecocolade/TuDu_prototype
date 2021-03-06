from django.db import models
from datetime import datetime as dt
from mapbox_location_field.models import LocationField
from django.contrib.auth.models import User
import uuid
from django.conf import settings


# Create your models here.


class Categories(models.Model):
    
    name = models.CharField(max_length=200, primary_key=True)
    summary = models.TextField()
    created = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Categories'
    
    def _str_(self):
        return self.name

    
class SubCategories(models.Model):

    name = models.CharField(max_length=200, primary_key=True)
    category = models.ForeignKey(Categories, default='Unknown', on_delete=models.SET_DEFAULT)
    summary = models.TextField()
    icon = models.FileField(upload_to='main/img/sub_cat_icons/', default='main/img/sub_cat_icons/favicon.png')
    created = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Sub-Categories'

    def _str_(self):
        return self.name


class Locations(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, default=-1, on_delete=models.PROTECT)
    primary_sub_category = models.ForeignKey(SubCategories, default='Unknown', on_delete=models.SET_DEFAULT)
    secondary_sub_categories = models.ManyToManyField(SubCategories, related_name='secondary_sub_categories')
    name = models.CharField(max_length=200, unique=True)
    location = models.CharField(max_length=200)
    nearest_access = models.CharField(max_length=200)
    description = models.TextField()
    photo = models.FileField(upload_to='main/locations/')
    upload_date = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Locations'

    def _str_(self):
        return self.name


class Visits(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    visitor = models.ForeignKey(User, default='Deleted', on_delete=models.SET_DEFAULT)
    location = models.ForeignKey(Locations, default='Deleted', on_delete=models.SET_DEFAULT)
    comment = models.TextField()
    photo = models.ImageField(upload_to='main/locations/visits/')
    Rating_CHOICES = ((1, 'Poor'), (2, 'Average'), (3, 'Good'), (4, 'Very Good'), (5, 'Excellent'))
    rating = models.IntegerField(choices=Rating_CHOICES, default=3)
    is_fraudlent = models.BooleanField(default=False)
    visit_date = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Visits'

    def _str_(self):
        return self.id
