# api/views.py

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from devsessions.models import Chemical,Developer,Developertype
from cameras.models import CameraBody,FilmFormat,NegativeSize,LensType,Lens,LensMount,Accessory,CameraKit,FilmStockInstance,FilmEmulsion,PhotoSession
from .serializers import ChemicalSerializer, DeveloperSerializaer,DevelopertypeSerializer,CameraBodySerializer,LensMountSerializer,LensSerializer,LensTypeSerializer,FilmFormatSerializer,NegativeSizeSerializer,AccessorySerializer,CameraKitSerializer,FilmEmulsionSerializer,FilmStockInstanceSerializer, PhotoSessionSerializer

from django.contrib.auth import authenticate, login,logout
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated



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
    
class FilmEmulsionViewSet(viewsets.ModelViewSet):
    queryset = FilmEmulsion.objects.all()
    serializer_class = FilmEmulsionSerializer
    permission_classes = [AllowAny]

class FilmStockInstanceViewSet(viewsets.ModelViewSet):
    queryset = FilmStockInstance.objects.all()
    serializer_class = FilmStockInstanceSerializer
    permission_classes = [AllowAny]    
    
    
class PhotoSessionViewSet(viewsets.ModelViewSet):
    queryset = PhotoSession.objects.all()
    serializer_class = PhotoSessionSerializer
    permission_classes = [AllowAny]    
    
    
@api_view(['POST'])
@permission_classes([AllowAny])

def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({
            'detail': 'Sesión iniciada correctamente',
            'username': user.username
        })
    return JsonResponse({'detail': 'Credenciales inválidas'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_logout(request):
    logout(request)
    return JsonResponse({'detail': 'Sesión cerrada correctamente'})


@api_view(['GET'])
@permission_classes([AllowAny])
def current_user(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'is_authenticated': True,
            'username': request.user.username
        })
    return JsonResponse({'is_authenticated': False})