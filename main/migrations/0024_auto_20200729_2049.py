# Generated by Django 3.0.3 on 2020-07-29 20:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_auto_20200729_1827'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 29, 20, 49, 19, 437151)),
        ),
        migrations.AlterField(
            model_name='locations',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 29, 20, 49, 19, 438369)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 29, 20, 49, 19, 437735)),
        ),
        migrations.AlterField(
            model_name='visits',
            name='visit_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 29, 20, 49, 19, 439747)),
        ),
    ]
