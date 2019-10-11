# Create your views here.
from django.http import HttpRequest, HttpResponse
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "index.html"
