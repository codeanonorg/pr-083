from uuid import uuid4

from django.conf import settings
from django.db import models


# Create your models here.

class BaseObject(models.Model):
    class Meta:
        abstract = True
    uid = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    modified_at = models.DateTimeField(auto_now=True, editable=False)


class User(BaseObject):
    raw_user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='data_user', on_delete=models.CASCADE)
    levels_done = models.ManyToManyField('Level', related_name='done_users')


class Level(BaseObject):
    name = models.CharField(max_length=100)
    needs = models.ManyToManyField('Level', related_name='depends')
    data = models.TextField() # TODO: Chercher comment intégrer les données
    tracking_allowed = models.BooleanField(default=True)
    diagonal_allowed = models.BooleanField(default=True)

    def done_for_user(self, user: User) -> bool:
        return self.done_users.filter(uid=user.uid).exists()

    def is_allowed_for_user(self, user: User) -> bool:
        # Vérifie que tous les niveaux nécéssaires sont vérifiés
        if self.needs.count() > 0:
            return all(l.done_for_user(user) for l in self.needs.all())
        else:
            # Vérifier que les niveaux fait par l'utilisateur contient le niveau actuel
            return True
