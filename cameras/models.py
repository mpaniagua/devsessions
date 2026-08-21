from django.db import models


# 1. Tabla para Formatos de Película
class FilmFormat(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Formato de Película")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Formato de Película"
        verbose_name_plural = "Formatos de Película"
        ordering = ['name']

    def __str__(self):
        return self.name


# 2. Tabla para Tamaños / Dimensiones de Negativo
class NegativeSize(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Tamaño de Negativo")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Tamaño de Negativo"
        verbose_name_plural = "Tamaños de Negativos"
        ordering = ['name']

    def __str__(self):
        return self.name


# 3. NUEVA: Tabla Independiente para Monturas (Lens Mount)
class LensMount(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nombre de la Montura",
        help_text="Ej. Leica M, Nikon F, Canon FD, M42, Copal #0, Hasselblad V, L39 / M39"
    )
    description = models.TextField(blank=True, null=True, verbose_name="Descripción / Notas")

    class Meta:
        verbose_name = "Montura de Lente"
        verbose_name_plural = "Monturas de Lentes"
        ordering = ['name']

    def __str__(self):
        return self.name


# 4. NUEVA: Tabla Independiente para Tipos / Clasificaciones de Lente
class LensType(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Tipo / Característica",
        help_text="Ej. Telefoto, Gran Angular, Macro, Rangefinder Coupled, Multi-mount, Convertible"
    )
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Tipo de Lente"
        verbose_name_plural = "Tipos de Lentes"
        ordering = ['name']

    def __str__(self):
        return self.name


# 5. NUEVO MODELO: Lentes (Lens)
class Lens(models.Model):
    
    focal_length = models.CharField(
        max_length=50,
        verbose_name="Distancia Focal",
        help_text="Ej. 50mm, 168mm, 75mm, 70-210mm"
    )
    
    max_aperture = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Apertura Máxima",
        help_text="Ej. f/2.8, f/5.6, f/6.8"
    )
    
    brand = models.CharField(
        max_length=100,
        verbose_name="Marca",
        help_text="Ej. Carl Zeiss, Leica, Fujinon, Voigtländer, Nikkor, C.P. Goerz"
    )
    model = models.CharField(
        max_length=100,
        verbose_name="Nombre o Modelo",
        help_text="Ej. Summicron 50mm f/2, Tessar 15cm f/4.5, SWD 75mm f/5.6"
    )
    serial_number = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Número de Serie"
    )

    # Relación ForeignKey a Montura
    lens_mount = models.ForeignKey(
        LensMount,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="lenses",
        verbose_name="Tipo de Montura"
    )

    # Relación ManyToMany a Tipos (Permite múltiples: Telefoto, Rangefinder coupled, etc.)
    lens_types = models.ManyToManyField(
        LensType,
        related_name="lenses",
        blank=True,
        verbose_name="Tipos / Clasificaciones del Lente"
    )

    # Propiedades físicas
    filter_thread_size = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Tamaño de Rosca de Filtro",
        help_text="Ej. 49mm, 52mm, Series VI, Bayonet VII, M40.5x0.5"
    )
    has_included_hood = models.BooleanField(
        default=False,
        verbose_name="¿Parasol / Lens Hood incluido?"
    )

    notes = models.TextField(blank=True, null=True, verbose_name="Notas adicionales")

    class Meta:
        verbose_name = "Lente"
        verbose_name_plural = "Lentes"
        ordering = ['brand', 'model']

    def __str__(self):
        mount_str = f" ({self.lens_mount.name})" if self.lens_mount else ""
        return f"{self.brand} {self.model}{mount_str}"


# 6. MODELO ACTUALIZADO: CameraBody
class CameraBody(models.Model):

    class CameraType(models.TextChoices):
        SLR = 'SLR', 'SLR (Single-Lens Reflex)'
        RANGEFINDER = 'RANGEFINDER', 'Telémetro / Rangefinder'
        TLR = 'TLR', 'TLR (Twin-Lens Reflex)'
        POINT_AND_SHOOT = 'POINT_AND_SHOOT', 'Compacta / Point & Shoot'
        MEDIUM_FORMAT_SYSTEM = 'MEDIUM_FORMAT_SYSTEM', 'Sistema de Medio Formato'
        LARGE_FORMAT_VIEW = 'LARGE_FORMAT_VIEW', 'Cámara de Gran Formato / Banco Óptico'
        OTHER = 'OTHER', 'Otro'

    class MechanismType(models.TextChoices):
        MECHANICAL = 'MECHANICAL', 'Completamente Mecánica'
        ELECTRONIC = 'ELECTRONIC', 'Electrónica (Requiere batería para operar)'
        HYBRID = 'HYBRID', 'Híbrida (Mecánica con funciones electrónicas)'

    brand = models.CharField(max_length=100, verbose_name="Marca")
    model = models.CharField(max_length=100, verbose_name="Modelo")

    camera_type = models.CharField(
        max_length=30,
        choices=CameraType.choices,
        default=CameraType.SLR,
        verbose_name="Tipo de Cámara"
    )

    film_formats = models.ManyToManyField(
        FilmFormat,
        related_name="camera_bodies",
        verbose_name="Formatos de Película Soportados"
    )
    negative_sizes = models.ManyToManyField(
        NegativeSize,
        related_name="camera_bodies",
        verbose_name="Tamaños de Negativo Compatibles"
    )

    mechanism_type = models.CharField(
        max_length=20,
        choices=MechanismType.choices,
        default=MechanismType.MECHANICAL,
        verbose_name="Tipo de Mecanismo"
    )
    has_light_meter = models.BooleanField(default=False, verbose_name="¿Tiene exposímetro integrado?")
    has_interchangeable_lens = models.BooleanField(default=True, verbose_name="¿Montura/Lentes intercambiables?")

    # CAMBIO REALIZADO: Ahora es ForeignKey apuntando a la tabla LensMount
    lens_mount = models.ForeignKey(
        LensMount,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="camera_bodies",
        verbose_name="Montura de Lente",
        help_text="Selecciona la montura compatible para esta cámara"
    )

    battery_type = models.CharField(max_length=100, blank=True, null=True, verbose_name="Tipo de Batería")
    release_year = models.PositiveIntegerField(blank=True, null=True, verbose_name="Año de Lanzamiento")
    notes = models.TextField(blank=True, null=True, verbose_name="Notas adicionales")

    class Meta:
        verbose_name = "Cuerpo de Cámara"
        verbose_name_plural = "Cuerpos de Cámaras"
        ordering = ['brand', 'model']

    def __str__(self):
        return f"{self.brand} {self.model}"