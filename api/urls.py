from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ( api_login,api_logout,current_user, ChemicalViewSet,DeveloperViewSet,
                    DeveloperTypeViewSet, CameraBodyViewset,FilmFormatViewSet,NegativeSizeViewSet,
                    LensMountViewSet,LensTypeViewSet,LensViewSet,AccessoryViewSet,CameraKitViewSet,
                    FilmEmulsionViewSet,FilmStockInstanceViewSet,PhotoSessionViewSet)


router = DefaultRouter()
router.register(r'chemicals',ChemicalViewSet,basename='chemical')
router.register(r'developers', DeveloperViewSet,basename='developer')
router.register(r'developertype',DeveloperTypeViewSet, basename='developertype')
router.register(r'camerabody',CameraBodyViewset,basename='camerabody')
router.register(r'film-formats', FilmFormatViewSet, basename='filmformat')
router.register(r'negative-sizes', NegativeSizeViewSet, basename='negativesize')
router.register(r'lens-mounts', LensMountViewSet, basename='lensmount')
router.register(r'lens-types', LensTypeViewSet, basename='lenstype')
router.register(r'lenses', LensViewSet, basename='lens')
router.register(r'accessories', AccessoryViewSet, basename='accessory')
router.register(r'kits', CameraKitViewSet, basename='camerakit')
router.register(r'film-emulsions', FilmEmulsionViewSet, basename='filmemulsion')
router.register(r'film-stocks', FilmStockInstanceViewSet, basename='filmstockinstance')
router.register(r'sessions', PhotoSessionViewSet, basename='photosession')

urlpatterns = [
    path('auth/login/', api_login, name='api_login'),
    path('auth/logout/', api_logout, name='api_logout'),
    path('auth/user/', current_user, name='current_user'),
    path('', include(router.urls)),
]