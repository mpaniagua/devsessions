from django.shortcuts import render
from django.views.generic import ListView,DetailView,FormView
from django.views.generic.edit import (UpdateView,DeleteView,CreateView)
from django.urls import reverse_lazy,reverse
from .models import DeveloperChemical,Developer,Developertype,Chemical
from  django.views import View
from django.views.generic.detail import SingleObjectMixin
from django.contrib.auth.mixins import (LoginRequiredMixin,UserPassesTestMixin)
#custom



class DeveloperListview(LoginRequiredMixin,ListView):
    model= Developer
    template_name= 'devsessions/developer_list_view.html'

class ChemicalListView(LoginRequiredMixin,ListView):
    model=Chemical
    template_name="devsessions/chemical_list_view.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['viewname']= "Chemical List"
        return context

class ChemicalCreateView(LoginRequiredMixin,CreateView):
    model=Chemical
    template_name="devsessions/chemical_create_view.html"
    fields=("name",)

class ChemicalEditView(LoginRequiredMixin,UpdateView):
    model=Chemical
    fields =(
            "name",        
        )
    
    template_name="devsessions/chemical_edit_view.html"

class ChemicalDeleteView(LoginRequiredMixin,DeleteView):
    model=Chemical
    template_name="devsessions/chemical_delete_view.html"
    success_url=reverse_lazy("chemical_list")