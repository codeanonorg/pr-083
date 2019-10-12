from django.urls import path

from data.views import IndexView, GameView

app_name = "data"

urlpatterns = [
    path("<str:pk>", GameView.as_view(), name="game"),
    path("", IndexView.as_view(), name="index")
]
