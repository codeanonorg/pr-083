# Create your views here.
import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, ListView, CreateView

from app import forms
from app.models import Level, User


class IndexView(ListView):
    model = Level
    context_object_name = "levels"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            data_user, _ = User.objects.get_or_create(raw_user_id=self.request.user.pk)
            return data_user.get_available_levels()
        return Level.objects.none()

    def get_template_names(self):
        if self.request.user.is_authenticated:
            return ["pr083/index_connected.html"]
        return ["pr083/index_disconnected.html"]


class RegisterView(CreateView):
    form_class = forms.SignupForm
    success_url = reverse_lazy("app:index")
    template_name = "pr083/signup.html"


# noinspection PyMethodMayBeStatic
@method_decorator([login_required, csrf_exempt], name="dispatch")
class GameView(LoginRequiredMixin, DetailView):
    model = Level
    template_name = "pr083/game.html"
    context_object_name = "level"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["level_data"] = self.object.json_data;
        context["level_data"].update(dict(user=self.request.user.pk, level=self.object.pk))
        return context

    def post(self, request: HttpRequest, *args, **kwargs):
        body = json.loads(request.body)
        user = request.user._wrapped if hasattr(request.user, '_wrapped') else request.user
        level = Level.objects.get(pk=body["level"])
        # TODO: Check sequence
        level.done_users.add(user.data_user)
        return JsonResponse({'ok': True}, status=200)
