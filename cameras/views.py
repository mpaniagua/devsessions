from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie

def camera_catalog_view(request):
    return render(request, 'cameras/cameras.html')


def lens_catalog_view(request):
    return render(request, 'cameras/lenses.html')