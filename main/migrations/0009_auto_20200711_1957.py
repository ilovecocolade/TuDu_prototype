# Generated by Django 3.0.3 on 2020-07-11 19:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20200711_1956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 57, 57, 81698)),
        ),
        migrations.AlterField(
            model_name='locations',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 57, 57, 82777)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 57, 57, 82130)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='icon',
            field=models.ImageField(default='media/main/img/favicon.png', upload_to='media/main/img/sub_cat_icons/'),
        ),
        migrations.AlterField(
            model_name='visits',
            name='visit_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 57, 57, 83887)),
        ),
    ]