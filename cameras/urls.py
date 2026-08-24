from django.urls import path
from .views import camera_catalog_view,lens_catalog_view, kit_catalog_view, accessory_catalog_view, dark_app_view

urlpatterns = [
    path('cameras/', camera_catalog_view, name='camera-catalog'),
    path('camera/', camera_catalog_view, name='camera-list'),
    path('lenses/', lens_catalog_view, name='lens-catalog'),
    path('accessories-ui/', accessory_catalog_view, name='accessory-catalog-ui'),
    path('kits-ui/', kit_catalog_view, name='kit-catalog-ui'),
    path('app/', dark_app_view, name='dark-app-ui'),
]
