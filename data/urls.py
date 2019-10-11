from django.urls import path

from data.views import IndexView, GameView

urlpatterns = [
    path("<str:uid>", GameView.as_view()),
    path("", IndexView.as_view())
]
