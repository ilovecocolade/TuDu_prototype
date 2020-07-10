from django.db import models
from datetime import datetime as dt
from mapbox_location_field.models import LocationField
from django.contrib.auth.models import User
import uuid


# Create your models here.


User._meta.get_field('email')._unique = True


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
    created = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Sub-Categories'

    def _str_(self):
        return self.name


class Locations(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sub_categories = models.ManyToManyField(SubCategories)
    name = models.CharField(max_length=200, unique=True)
    location = LocationField()
    nearest_access = LocationField()
    description = models.TextField()
    photo = models.ImageField(upload_to='photos/')
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
    photo = models.ImageField(upload_to='photos/')
    Rating_CHOICES = ((1, 'Poor'), (2, 'Average'), (3, 'Good'), (4, 'Very Good'), (5, 'Excellent'))
    rating = models.IntegerField(choices=Rating_CHOICES, default=3)
    is_fraudlent = models.BooleanField(default=False)
    visit_date = models.DateTimeField(default=dt.now())

    class Meta:
        verbose_name_plural = 'Visits'

    def _str_(self):
        return self.id
