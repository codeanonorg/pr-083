# Generated by Django 2.2.6 onCb 2019-10-11 21:09

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='level',
            old_name='needs',
            new_name='parent',
        ),
    ]
