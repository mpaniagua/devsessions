# api/serializers.py

from rest_framework import serializers
from  devsessions.models import Chemical,Developer,Developertype
from cameras.models import CameraBody, FilmFormat, NegativeSize,Lens,LensMount,LensType


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

class LensMountSerializer(serializers.ModelSerializer):
    class Meta:
        model = LensMount
        fields = ['id', 'name', 'description']


class LensTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LensType
        fields = ['id', 'name', 'description']


# --- Serializador de Lentes ---
class LensSerializer(serializers.ModelSerializer):
    lens_mount_detail = LensMountSerializer(source='lens_mount', read_only=True)
    lens_types_detail = LensTypeSerializer(source='lens_types', many=True, read_only=True)

    lens_mount = serializers.PrimaryKeyRelatedField(
        queryset=LensMount.objects.all(), allow_null=True, required=False, write_only=True
    )
    lens_types = serializers.PrimaryKeyRelatedField(
        queryset=LensType.objects.all(), many=True, required=False, write_only=True
    )

    class Meta:
        model = Lens
        fields = [
            'id', 'brand', 'model', 'focal_length', 'max_aperture',
            'serial_number', 'lens_mount', 'lens_mount_detail',
            'lens_types', 'lens_types_detail',
            'filter_thread_size', 'has_included_hood', 'notes'
        ]


class FilmFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmFormat
        fields = ['id', 'name', 'description']


class NegativeSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NegativeSize
        fields = ['id', 'name', 'description']


# --- Serializador de Cuerpo de Cámara (Actualizado con LensMount) ---
class CameraBodySerializer(serializers.ModelSerializer):
    film_formats_detail = serializers.SerializerMethodField()
    negative_sizes_detail = serializers.SerializerMethodField()
    lens_mount_detail = LensMountSerializer(source='lens_mount', read_only=True)

    film_formats = serializers.PrimaryKeyRelatedField(
        queryset=FilmFormat.objects.all(), many=True, write_only=True
    )
    negative_sizes = serializers.PrimaryKeyRelatedField(
        queryset=NegativeSize.objects.all(), many=True, write_only=True
    )
    lens_mount = serializers.PrimaryKeyRelatedField(
        queryset=LensMount.objects.all(), allow_null=True, required=False, write_only=True
    )

    class Meta:
        model = CameraBody
        fields = [
            'id', 'brand', 'model', 'camera_type',
            'film_formats', 'film_formats_detail',
            'negative_sizes', 'negative_sizes_detail',
            'mechanism_type', 'has_light_meter', 'has_interchangeable_lens',
            'lens_mount', 'lens_mount_detail',
            'battery_type', 'release_year', 'notes'
        ]

    def get_film_formats_detail(self, obj):
        from .serializers import FilmFormatSerializer
        return FilmFormatSerializer(obj.film_formats.all(), many=True).data

    def get_negative_sizes_detail(self, obj):
        from .serializers import NegativeSizeSerializer
        return NegativeSizeSerializer(obj.negative_sizes.all(), many=True).data