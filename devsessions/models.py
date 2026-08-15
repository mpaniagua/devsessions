from django.conf import settings
from django.db import models
from django.urls import reverse, reverse_lazy
# Create your models here.

class Theme(models.Model):
    name=models.CharField(max_length=250)
    stylesheet=models.TextField()
    scriptcode=models.TextField()
    def __str__(self):
        return self.name

class Units(models.Model):
    name= models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Developertype(models.Model):
    type= models.CharField(max_length=200)
    def __str__(self):
        return self.type

class Developer(models.Model):
    name= models.CharField(max_length=200)
    developertype =  models.ForeignKey(Developertype,on_delete=models.CASCADE)
    comment = models.CharField(max_length=250)

    def __str__(self):
        return self.name
    
class Chemical(models.Model):
    name= models.CharField(max_length=250)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
            return reverse("chemical_list")

class DeveloperChemical(models.Model):
    Developer= models.ForeignKey(Developer,on_delete=models.CASCADE)
    Chemical = models.ForeignKey(Chemical,on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    unit = models.ForeignKey(Units,on_delete=models.CASCADE)

    def __str__(self):
        return self.Chemical.name




class CameraBody(models.Model):

    # 1. Opciones predefinidas (Choices)
    class CameraType(models.TextChoices):
        SLR = 'SLR', 'SLR (Single-Lens Reflex)'
        RANGEFINDER = 'RANGEFINDER', 'Telémetro / Rangefinder'
        TLR = 'TLR', 'TLR (Twin-Lens Reflex)'
        POINT_AND_SHOOT = 'POINT_AND_SHOOT', 'Compacta / Point & Shoot'
        MEDIUM_FORMAT_SYSTEM = 'MEDIUM_FORMAT_SYSTEM', 'Sistema de Medio Formato'
        LARGE_FORMAT_VIEW = 'LARGE_FORMAT_VIEW', 'Cámara de Gran Formato / Banco Óptico'
        OTHER = 'OTHER', 'Otro'

    class FilmFormat(models.TextChoices):
        FORMAT_35MM = '35MM', '35mm / 135'
        FORMAT_120 = '120', '120 (Medio Formato)'
        FORMAT_220 = '220', '220 (Medio Formato)'
        FORMAT_LARGE = 'LARGE', 'Gran Formato (Placas/Sheet Film)'
        FORMAT_110 = '110', '110'
        FORMAT_126 = '126', '126'
        FORMAT_APS = 'APS', 'APS (Advanced Photo System)'

    class MechanismType(models.TextChoices):
        MECHANICAL = 'MECHANICAL', 'Completamente Mecánica'
        ELECTRONIC = 'ELECTRONIC', 'Electrónica (Requiere batería para operar)'
        HYBRID = 'HYBRID', 'Híbrida (Mecánica con funciones electrónicas)'

    # 2. Campos de identificación básica
    brand = models.CharField(
        max_length=100,
        verbose_name="Marca",
        help_text="Ej. Leica, Canon, Nikon, Hasselblad"
    )
    model = models.CharField(
        max_length=100,
        verbose_name="Modelo",
        help_text="Ej. AE-1, M3, K1000, 500 C/M"
    )

    # 3. Clasificación técnica
    camera_type = models.CharField(
        max_length=30,
        choices=CameraType.choices,
        default=CameraType.SLR,
        verbose_name="Tipo de Cámara"
    )
    film_format = models.CharField(
        max_length=20,
        choices=FilmFormat.choices,
        default=FilmFormat.FORMAT_35MM,
        verbose_name="Formato de Película"
    )
    negative_size = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Formato/Tamaño del Negativo",
        help_text="Ej. 24x36mm, 6x6 cm, 6x7 cm, 4x5 pulgadas"
    )

    # 4. Características físicas y operativas
    mechanism_type = models.CharField(
        max_length=20,
        choices=MechanismType.choices,
        default=MechanismType.MECHANICAL,
        verbose_name="Tipo de Mecanismo"
    )
    has_light_meter = models.BooleanField(
        default=False,
        verbose_name="¿Tiene exposímetro integrado?"
    )
    has_interchangeable_lens = models.BooleanField(
        default=True,
        verbose_name="¿Montura/Lentes intercambiables?",
        help_text="Desmarcar si es una cámara con lente fijo (ej. la mayoría de las Point & Shoot o TLRs)"
    )
    lens_mount = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Montura de Lente",
        help_text="Ej. Canon FD, Nikon F, M42, Leica M, Hasselblad V"
    )

    # 5. Detalles adicionales
    battery_type = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Tipo de Batería",
        help_text="Ej. LR44, CR2, PX625 (dejar en blanco si no requiere)"
    )
    release_year = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name="Año de Lanzamiento"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="Notas adicionales"
    )

    class Meta:
        verbose_name = "Cuerpo de Cámara"
        verbose_name_plural = "Cuerpos de Cámaras"
        ordering = ['brand', 'model']

    def __str__(self):
        return f"{self.brand} {self.model} ({self.get_film_format_display()})"
