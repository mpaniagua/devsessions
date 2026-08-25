from django.db import models
from django.utils import timezone

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
    
    
    
    
class Accessory(models.Model):

    class AccessoryType(models.TextChoices):
        FILM_BACK = 'FILM_BACK', 'Respaldo / Magazine de Película'
        VIEWFINDER = 'VIEWFINDER', 'Visor / Prisma / Cintura'
        DARK_SLIDE = 'DARK_SLIDE', 'Chasis / Dark Slide / Placa'
        LENS_BOARD = 'LENS_BOARD', 'Tabla de Lente (Lens Board)'
        MOTOR_DRIVE = 'MOTOR_DRIVE', 'Motor / Winder'
        ADAPTER = 'ADAPTER', 'Adaptador / Anillo'
        HOOD = 'HOOD', 'Parasol / Compendio'
        OTHER = 'OTHER', 'Otro Accesorio'

    brand = models.CharField(
        max_length=100,
        verbose_name="Marca",
        help_text="Ej. Hasselblad, Mamiya, Horseman, Custom 3D Printed"
    )
    model = models.CharField(
        max_length=100,
        verbose_name="Modelo / Nombre",
        help_text="Ej. Respaldo A12, Prisma PM45, Tabla Linhof Technika"
    )
    accessory_type = models.CharField(
        max_length=30,
        choices=AccessoryType.choices,
        default=AccessoryType.OTHER,
        verbose_name="Tipo de Accesorio"
    )
    serial_number = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Número de Serie"
    )

    # Opcionales si el accesorio (ej. respaldo) define un formato o tamaño específico
    film_format = models.ForeignKey(
        FilmFormat,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Formato de Película (si aplica)",
        help_text="Ej. 120 para un respaldo A12"
    )
    negative_size = models.ForeignKey(
        NegativeSize,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Tamaño de Negativo (si aplica)",
        help_text="Ej. 6x6, 6x7, 6x4.5"
    )

    notes = models.TextField(blank=True, null=True, verbose_name="Notas adicionales")

    class Meta:
        verbose_name = "Accesorio"
        verbose_name_plural = "Accesorios"
        ordering = ['brand', 'model']

    def __str__(self):
        return f"{self.brand} {self.model} ({self.get_accessory_type_display()})"


    # 2. NUEVO: Modelo de Combinación / Configuración de Disparo (CameraKit)
class CameraKit(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name="Nombre de la Configuración / Kit",
        help_text="Ej. Mamiya RB67 + 90mm 6x7 Kit, Wista 45SP Landscape Rig"
    )

    # El cuerpo principal
    camera_body = models.ForeignKey(
        CameraBody,
        on_delete=models.CASCADE,
        related_name="kits",
        verbose_name="Cuerpo de Cámara"
    )

    # El lente montado (opcional en cámaras de lente fijo o configuraciones especiales)
    lenses = models.ManyToManyField(
        Lens,
        related_name="kits",
        blank=True,
        verbose_name="Lentes Incluidos / Compatibles"
    )

    # Accesorios acoplados a esta configuración específica
    accessories = models.ManyToManyField(
        Accessory,
        related_name="kits",
        blank=True,
        verbose_name="Accesorios Incluidos",
        help_text="Selecciona el respaldo, visor o adaptadores que forman este kit"
    )

    # Especificaciones resultantes de la combinación
    active_film_format = models.ForeignKey(
        FilmFormat,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Formato de Película Activo",
        help_text="El formato usado en esta configuración específica (Ej. 120)"
    )
    active_negative_size = models.ForeignKey(
        NegativeSize,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Tamaño de Negativo Activo",
        help_text="El tamaño producido por esta combinación (Ej. 6x7 cm, 4x5 in)"
    )

    is_active_setup = models.BooleanField(
        default=True,
        verbose_name="¿Configuración lista para disparar?.",
        help_text="Marcar si el kit está ensamblado y listo para usarse"
    )

    notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="Notas de la configuración",
        help_text="Ej. Requiere brida especial, listo con carrete cargado, etc."
    )

    class Meta:
        verbose_name = "Configuración / Kit de Cámara"
        verbose_name_plural = "Configuraciones / Kits de Cámaras"
        ordering = ['name']

    def __str__(self):
        lens_str = f" + {self.lens.brand} {self.lens.focal_length}" if self.lens else ""
        return f"{self.name} [{self.camera_body.brand} {self.camera_body.model}{lens_str}]"
    


class FilmEmulsion(models.Model):
    class ProcessType(models.TextChoices):
        BW = 'BW', 'Blanco y Negro'
        C41 = 'C41', 'Color Negativo (C-41)'
        E6 = 'E6', 'Diapositiva / Reversible (E-6)'
        ECN2 = 'ECN2', 'Cine / Negativo Color (ECN-2)'
        OTHER = 'OTHER', 'Otro Proceso'

    manufacturer = models.CharField(
        max_length=100,
        verbose_name="Fabricante / Marca",
        help_text="Ej. Kodak, Ilford, Agfa, Fujifilm, Foma"
    )
    name = models.CharField(
        max_length=100,
        verbose_name="Nombre de Emulsión",
        help_text="Ej. Tri-X 400, HP5 Plus, Aviphot 200, Portra 400"
    )
    process_type = models.CharField(
        max_length=10,
        choices=ProcessType.choices,
        default=ProcessType.BW,
        verbose_name="Tipo de Proceso / Emulsión"
    )
    base_iso = models.IntegerField(
        verbose_name="Sensibilidad Base (ISO/ASA)",
        help_text="Ej. 100, 200, 400, 3200"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Características / Notas de Revelado"
    )

    class Meta:
        verbose_name = "Emulsión de Película"
        verbose_name_plural = "Emulsiones de Película"
        ordering = ['manufacturer', 'name']

    def __str__(self):
        return f"{self.manufacturer} {self.name} (ISO {self.base_iso})"


class FilmStockInstance(models.Model):
    class StorageStatus(models.TextChoices):
        FRESH = 'FRESH', 'Sin Usar / Almacenado'
        LOADED = 'LOADED', 'Cargado en Cámara / Respaldo'
        EXPOSED = 'EXPOSED', 'Expuesto / Listo p/ Revelar'
        DEVELOPED = 'DEVELOPED', 'Revelado'

    emulsion = models.ForeignKey(
        FilmEmulsion,
        on_delete=models.CASCADE,
        related_name="instances",
        verbose_name="Emulsión / Tipo de Película"
    )
    film_format = models.ForeignKey(
        FilmFormat,
        on_delete=models.CASCADE,
        related_name="film_instances",
        verbose_name="Formato de Película"
    )
    negative_size = models.ForeignKey(
        NegativeSize,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Tamaño de Placa / Negativo"
    )
    exposed_iso = models.IntegerField(
        verbose_name="ISO / ASA Expuesto"
    )
    expositions_count = models.IntegerField(
        default=12,
        verbose_name="Número de Exposiciones / Disparos"
    )
    status = models.CharField(
        max_length=15,
        choices=StorageStatus.choices,
        default=StorageStatus.FRESH,
        verbose_name="Estado de la Película"
    )
    expiration_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha de Caducidad"
    )
    # Fecha de ingreso al sistema (se usa para ddmmyy)
    created_at = models.DateTimeField(
        default=timezone.now,
        editable=False,
        verbose_name="Fecha de Ingreso"
    )
    roll_code = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Código / Lote / Identificador",
        help_text="Si se deja en blanco, se auto-generará como 000000DDMMYY (ej. 000001250826)"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="Notas de Exposición / Proceso"
    )

    class Meta:
        verbose_name = "Rollo / Placa de Película"
        verbose_name_plural = "Rollos y Placas de Película"
        ordering = ['-id']

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        # Primer guardado si es nuevo para obtener el ID de la base de datos
        super().save(*args, **kwargs)

        # Si no se ingresó un roll_code manual al crear, generamos el automático
        if is_new and not self.roll_code:
            date_str = self.created_at.strftime('%d%m%y') # ddmmyy
            id_padded = str(self.id).zfill(6)             # 6 dígitos con ceros a la izquierda
            self.roll_code = f"{id_padded}{date_str}"
            # Actualizamos únicamente el campo roll_code en la DB
            super().save(update_fields=['roll_code'])

    def __str__(self):
        code_str = f"[{self.roll_code}] " if self.roll_code else ""
        return f"{code_str}{self.emulsion.manufacturer} {self.emulsion.name} - {self.get_status_display()}"