from django.contrib import admin
from .models import Categories, Locations, Visits

# Register your models here.

admin.site.register(Categories)
admin.site.register(Locations)
admin.site.register(Visits)
