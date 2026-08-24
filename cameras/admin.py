from django.contrib import admin
from .models import CameraBody,NegativeSize,FilmFormat,LensMount,LensType,Lens,Accessory,CameraKit
# Register your models here.


admin.site.register(CameraBody)
admin.site.register(NegativeSize)
admin.site.register(FilmFormat)
admin.site.register(LensMount)
admin.site.register(LensType)
admin.site.register(Lens)
admin.site.register(Accessory)
admin.site.register(CameraKit)