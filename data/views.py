# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from data.models import Level


class IndexView(ListView):
    model = Level
    template_name = "index.html"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()


class GameView(LoginRequiredMixin, DetailView):
    model = Level
    template_name = "game.html"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.data_user.get_available_levels()
        return Level.objects.none()
