# Generated by Django 3.0.3 on 2020-07-27 00:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_auto_20200727_0141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 27, 1, 43, 15, 383184)),
        ),
        migrations.AlterField(
            model_name='locations',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='locations',
            name='upload_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 27, 1, 43, 15, 384184)),
        ),
        migrations.AlterField(
            model_name='subcategories',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 27, 1, 43, 15, 384184)),
        ),
        migrations.AlterField(
            model_name='visits',
            name='visit_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 27, 1, 43, 15, 385184)),
        ),
    ]
