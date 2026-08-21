from django.urls import path
from .views import camera_catalog_view,lens_catalog_view

urlpatterns = [
    path('cameras/', camera_catalog_view, name='camera-catalog'),
    path('lenses/', lens_catalog_view, name='lens-catalog'),
]