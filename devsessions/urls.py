from django.urls import path
from .views import  (DeveloperListview,ChemicalListView,ChemicalCreateView,ChemicalDeleteView,ChemicalEditView)

urlpatterns = [
    path("developers/",DeveloperListview.as_view(),name="developer_list"),
    path("<int:pk>/delete/",ChemicalDeleteView.as_view(),name="chemical_delete"),
    path("<int:pk>/edit/",ChemicalEditView.as_view(),name="chemical_update"),
    path("newchemical/",ChemicalCreateView.as_view(),name="chemical_new"),
    path("chemicals/", ChemicalListView.as_view(),name ="chemical_list")
]