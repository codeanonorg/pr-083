from django.contrib.auth import views as auth_views
from django.urls import path

from data import views

app_name = "data"

urlpatterns = [
    path("login", auth_views.LoginView.as_view(), name="login"),
    path("logout", auth_views.LogoutView.as_view(), name="logout"),
    path("signup", views.UserSignupView.as_view(), name="signup"),
    path("<str:pk>", views.GameView.as_view(), name="game"),
    path("", views.IndexView.as_view(), name="index")
]
