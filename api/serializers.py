# api/serializers.py

from rest_framework import serializers
from  devsessions.models import Chemical,Developer,Developertype,CameraBody

class DevelopertypeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Developertype
        fields = ['id','type']

class DeveloperSerializaer(serializers.ModelSerializer):
    developertype= DevelopertypeSerializer(read_only=True)
    class Meta:
        model = Developer
        fields = ['id','name','developertype','comment']


class ChemicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chemical
        fields = ['id', 'name']  # O usa '__all__' para incluir todos los campos

class CameraBodySerializer(serializers.ModelSerializer):
    # Opcional: Para mostrar las etiquetas legibles de las opciones de enum en el GET
    camera_type_display = serializers.CharField(source='get_camera_type_display', read_only=True)
    film_format_display = serializers.CharField(source='get_film_format_display', read_only=True)
    mechanism_type_display = serializers.CharField(source='get_mechanism_type_display', read_only=True)

    class Meta:
        model = CameraBody
        fields = '__all__'