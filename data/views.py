# Create your views here.
import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, ListView

from data.models import Level


class IndexView(ListView):
    model = Level
    template_name = "index.html"
    context_object_name = "levels"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()


# noinspection PyMethodMayBeStatic
@method_decorator([login_required, csrf_exempt], name="dispatch")
class GameView(LoginRequiredMixin, DetailView):
    model = Level
    template_name = "game.html"
    context_object_name = "level"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()

    def post(self, request: HttpRequest, *args, **kwargs):
        body = json.loads(request.body)
        user = request.user._wrapped if hasattr(request.user, '_wrapped') else request.user
        level = Level.objects.get(pk=body["level"])
        # TODO: Check sequence
        level.done_users.add(user.data_user)
        return JsonResponse({'ok': True}, status=200)
