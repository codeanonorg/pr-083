# Generated by Django 2.2.6 onCb 2019-10-11 21:07

import django.core.validators
import django.db.models.deletion
import mptt.fields
from django.conf import settings
from django.db import migrations, models

import data.models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('data', models.TextField()),
                ('oxygen', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('tracking_allowed', models.BooleanField(default=True)),
                ('diagonal_allowed', models.BooleanField(default=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('needs',
                 mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL,
                                            related_name='depends', to='data.Level')),
            ],
            options={
                'abstract': False,
            },
            bases=(data.models.BaseObjectMixin, models.Model),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('levels_done', models.ManyToManyField(blank=True, related_name='done_users', to='data.Level')),
                ('raw_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='data_user',
                                                  to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(data.models.BaseObjectMixin, models.Model),
        ),
    ]
