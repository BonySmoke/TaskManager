# Generated by Django 3.0.5 on 2020-05-09 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20200509_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('ToDo', 'to do'), ('In progress', 'in progress'), ('On hold', 'on hold'), ('Done', 'done')], default='ToDo', max_length=32),
        ),
    ]
