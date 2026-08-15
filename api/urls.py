from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ChemicalViewSet,DeveloperViewSet, DeveloperTypeViewSet, CameraBodyViewset


router = DefaultRouter()
router.register(r'chemicals',ChemicalViewSet,basename='chemical')
router.register(r'developers', DeveloperViewSet,basename='developer')
router.register(r'developertype',DeveloperTypeViewSet, basename='developertype')
router.register(r'camerabody',CameraBodyViewset,basename='camerabody')

urlpatterns=[
    path('',include(router.urls)),
]
