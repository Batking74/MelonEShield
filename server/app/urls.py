from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.urls import path, re_path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/AuthenticateUser/", views.AuthenticateUser, name='AuthenticateUser'),
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html"))
]