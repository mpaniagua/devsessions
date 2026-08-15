# api/views.py

from rest_framework import viewsets
from devsessions.models import Chemical,Developer,Developertype,CameraBody

from .serializers import ChemicalSerializer, DeveloperSerializaer,DevelopertypeSerializer,CameraBodySerializer

class ChemicalViewSet(viewsets.ModelViewSet):
    queryset = Chemical.objects.all()
    serializer_class = ChemicalSerializer

class DeveloperViewSet(viewsets.ModelViewSet):
    queryset= Developer.objects.all()
    serializer_class= DeveloperSerializaer

class DeveloperTypeViewSet(viewsets.ModelViewSet):
    queryset= Developertype.objects.all()
    serializer_class=DevelopertypeSerializer

class CameraBodyViewset(viewsets.ModelViewSet):
    queryset=CameraBody.objects.all()
    serializer_class=CameraBodySerializer