# Generated by Django 5.1.2 on 2024-11-14 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0002_stockdata_is_complete'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stockdata',
            name='is_complete',
        ),
        migrations.AddField(
            model_name='stockdata',
            name='remain_amount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
