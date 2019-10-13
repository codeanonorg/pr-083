# Create your views here.
import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, ListView, FormView

from data import forms
from data.models import Level


class IndexView(ListView):
    model = Level
    template_name = "pr083/index.html"
    context_object_name = "levels"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()


class RegisterView(FormView):
    form_class = forms.SignupForm

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


class UserSignupView(FormView):
    template_name = "signup.html"
    form_class = UserCreationForm
