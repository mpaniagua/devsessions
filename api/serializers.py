# api/serializers.py

from rest_framework import serializers
from  devsessions.models import Chemical,Developer,Developertype
from cameras.models import CameraBody, FilmFormat, NegativeSize,Lens,LensMount,LensType,Accessory,CameraKit, FilmEmulsion,FilmStockInstance,PhotoSession


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
    
    
class AccessorySerializer(serializers.ModelSerializer):
    film_format_detail = FilmFormatSerializer(source='film_format', read_only=True)
    negative_size_detail = NegativeSizeSerializer(source='negative_size', read_only=True)

    film_format = serializers.PrimaryKeyRelatedField(
        queryset=FilmFormat.objects.all(), allow_null=True, required=False, write_only=True
    )
    negative_size = serializers.PrimaryKeyRelatedField(
        queryset=NegativeSize.objects.all(), allow_null=True, required=False, write_only=True
    )

    class Meta:
        model = Accessory
        fields = [
            'id', 'brand', 'model', 'accessory_type', 'serial_number',
            'film_format', 'film_format_detail',
            'negative_size', 'negative_size_detail', 'notes'
        ]


class CameraKitSerializer(serializers.ModelSerializer):
    # Detalles para lectura GET
    camera_body_detail = CameraBodySerializer(source='camera_body', read_only=True)
    lenses_detail = LensSerializer(source='lenses', many=True, read_only=True)
    accessories_detail = AccessorySerializer(source='accessories', many=True, read_only=True)
    active_film_format_detail = FilmFormatSerializer(source='active_film_format', read_only=True)
    active_negative_size_detail = NegativeSizeSerializer(source='active_negative_size', read_only=True)

    # Campos de escritura por ID (POST / PUT)
    camera_body = serializers.PrimaryKeyRelatedField(queryset=CameraBody.objects.all())
    lenses = serializers.PrimaryKeyRelatedField(queryset=Lens.objects.all(), many=True, required=False)
    accessories = serializers.PrimaryKeyRelatedField(queryset=Accessory.objects.all(), many=True, required=False)
    active_film_format = serializers.PrimaryKeyRelatedField(queryset=FilmFormat.objects.all(), allow_null=True, required=False)
    active_negative_size = serializers.PrimaryKeyRelatedField(queryset=NegativeSize.objects.all(), allow_null=True, required=False)

    class Meta:
        model = CameraKit
        fields = [
            'id', 'name', 'is_active_setup', 'notes',
            'camera_body', 'camera_body_detail',
            'lenses', 'lenses_detail',
            'accessories', 'accessories_detail',
            'active_film_format', 'active_film_format_detail',
            'active_negative_size', 'active_negative_size_detail'
        ]
        
class FilmEmulsionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmEmulsion
        fields = [
            'id', 'manufacturer', 'name', 'process_type',
            'base_iso', 'description'
        ]


class FilmStockInstanceSerializer(serializers.ModelSerializer):
    emulsion_detail = FilmEmulsionSerializer(source='emulsion', read_only=True)
    film_format_detail = FilmFormatSerializer(source='film_format', read_only=True)
    negative_size_detail = NegativeSizeSerializer(source='negative_size', read_only=True)
    film_back_detail = AccessorySerializer(source='film_back', read_only=True)

    emulsion = serializers.PrimaryKeyRelatedField(queryset=FilmEmulsion.objects.all())
    film_format = serializers.PrimaryKeyRelatedField(queryset=FilmFormat.objects.all())
    negative_size = serializers.PrimaryKeyRelatedField(
        queryset=NegativeSize.objects.all(), allow_null=True, required=False
    )
    film_back = serializers.PrimaryKeyRelatedField(
        queryset=Accessory.objects.all(), allow_null=True, required=False
    )
    roll_code = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = FilmStockInstance
        fields = [
            'id', 'emulsion', 'emulsion_detail',
            'film_format', 'film_format_detail',
            'negative_size', 'negative_size_detail',
            'film_back', 'film_back_detail',
            'exposed_iso', 'expositions_count', 'status',
            'expiration_date', 'created_at', 'roll_code', 'notes'
        ]

        
        
class PhotoSessionSerializer(serializers.ModelSerializer):
    kit_detail = CameraKitSerializer(source= 'kit', read_only=True)
    film_stocks_detail = FilmStockInstanceSerializer(source='film_stocks', many=True, read_only=True)

    kit = serializers.PrimaryKeyRelatedField(
        queryset=CameraKit.objects.all(),
        allow_null=True,
        required=False
    )
    film_stocks = serializers.PrimaryKeyRelatedField(
        queryset=FilmStockInstance.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = PhotoSession
        fields = [
            'id', 'title', 'kit', 'kit_detail',
            'film_stocks', 'film_stocks_detail',
            'start_date', 'end_date', 'location',
            'is_multiple_locations', 'locations_detail',
            'notes', 'created_at'
        ]        