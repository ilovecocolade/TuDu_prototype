# Generated by Django 3.0.3 on 2020-07-11 19:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200710_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 33, 53, 931306)),
        ),
        migrations.AlterField(
            model_name='locations',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 33, 53, 932318)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 33, 53, 931698)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='icon',
            field=models.ImageField(default='main/static/main/img/favicon.png', upload_to='main/static/main/img/sub_cat_icons/'),
        ),
        migrations.AlterField(
            model_name='visits',
            name='visit_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 11, 19, 33, 53, 933534)),
        ),
    ]