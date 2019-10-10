from uuid import uuid4

from django.conf import settings
from django.db import models


# Create your models here.

class BaseObject(models.Model):
    uid = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)


class User(BaseObject):
    raw_user = models.OneToOneField(settings.AUTH_USER, related_name='data_user', on_delete=models.CASCADE)
    levels_done = models.ManyToManyField('Level', related_name='done_users', on_delete=models.CASCADE)


class Level(BaseObject):
    name = models.CharField(max_length=100)
    needs = models.ManyToManyField('Level', related_name='depends')
