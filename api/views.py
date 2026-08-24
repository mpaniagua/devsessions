# api/views.py

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from devsessions.models import Chemical,Developer,Developertype
from cameras.models import CameraBody,FilmFormat,NegativeSize,LensType,Lens,LensMount,Accessory,CameraKit
from .serializers import ChemicalSerializer, DeveloperSerializaer,DevelopertypeSerializer,CameraBodySerializer,LensMountSerializer,LensSerializer,LensTypeSerializer,FilmFormatSerializer,NegativeSizeSerializer,AccessorySerializer,CameraKitSerializer

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
    permission_classes = [AllowAny]
    
class FilmFormatViewSet(viewsets.ModelViewSet):
    queryset = FilmFormat.objects.all()
    serializer_class = FilmFormatSerializer
    permission_classes = [AllowAny]

class NegativeSizeViewSet(viewsets.ModelViewSet):
    queryset = NegativeSize.objects.all()
    serializer_class = NegativeSizeSerializer        
    permission_classes = [AllowAny]
    


class LensMountViewSet(viewsets.ModelViewSet):
    queryset = LensMount.objects.all()
    serializer_class = LensMountSerializer
    permission_classes = [AllowAny]

class LensTypeViewSet(viewsets.ModelViewSet):
    queryset = LensType.objects.all()
    serializer_class = LensTypeSerializer
    permission_classes = [AllowAny]

class LensViewSet(viewsets.ModelViewSet):
    queryset = Lens.objects.all()
    serializer_class = LensSerializer
    permission_classes = [AllowAny]    
    
    
class AccessoryViewSet(viewsets.ModelViewSet):
    queryset = Accessory.objects.all()
    serializer_class = AccessorySerializer
    permission_classes = [AllowAny]

class CameraKitViewSet(viewsets.ModelViewSet):
    queryset = CameraKit.objects.all()
    serializer_class = CameraKitSerializer
    permission_classes = [AllowAny]    