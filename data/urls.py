from django.urls import path

from data.views import IndexView

urlpatterns = [
    path("", IndexView.as_view())
]
