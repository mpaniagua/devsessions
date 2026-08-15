from django.contrib import admin
from .models import Developertype,Developer, Chemical,DeveloperChemical, Units,Theme,CameraBody

# Register your models here.



class DeveloperChemicalInLine(admin.TabularInline):
    model = DeveloperChemical
    extra =0


class DeveloperAdmin(admin.ModelAdmin):
    inlines=[DeveloperChemicalInLine]
    list_display= [
        "name"
    ]

admin.site.register(Developer,DeveloperAdmin)

admin.site.register(Developertype)
admin.site.register(Chemical)
admin.site.register(DeveloperChemical)
admin.site.register(Units)
admin.site.register(Theme)
admin.site.register(CameraBody)