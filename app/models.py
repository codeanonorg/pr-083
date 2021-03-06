import json
from uuid import uuid4

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def user_save_signal(instance, **_kwargs):
    if not User.objects.filter(raw_user=instance).exists():
        User.objects.create(raw_user=instance)


class BaseObjectMixin:
    uid = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)


class BaseObject(models.Model, BaseObjectMixin):
    class Meta:
        abstract = True


class User(BaseObject):
    raw_user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='data_user', on_delete=models.CASCADE)
    levels_done = models.ManyToManyField('Level', related_name='done_users', blank=True)

    def get_available_levels(self):
        levels = Level.objects.exclude(parent=None).filter(parent__done_users__id=self.pk)
        levels |= Level.objects.filter(parent=None)
        return levels

    # noinspection PyUnresolvedReferences
    def __str__(self):
        return self.raw_user.get_full_name()


class Level(BaseObjectMixin, MPTTModel):
    name = models.CharField(max_length=100)
    parent = TreeForeignKey('self', related_name='depends', blank=True, null=True, on_delete=models.SET_NULL)
    data = models.TextField()  # TODO: Chercher comment intégrer les données
    oxygen = models.IntegerField(validators=(MinValueValidator(1),))
    tracking_allowed = models.BooleanField(default=True)
    diagonal_allowed = models.BooleanField(default=True)

    @property
    def json_data(self):
        return {
            'name': self.name,
            'code': "NO CODE",
            'positions': json.loads(self.data),
            'diagonalAllowed': self.diagonal_allowed,
            'trackingAllowed': self.tracking_allowed,
            'oxygen': self.oxygen
        }

    def __str__(self):
        return self.name
