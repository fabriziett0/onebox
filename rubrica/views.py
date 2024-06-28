from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Azienda
from django.urls import reverse


class AziendeListView(ListView):
    model = Azienda
    template_name = 'aziende_list.html'

class AziendeDetailView(DetailView):
    model = Azienda
    template_name = 'aziende_detail.html'

class AziendeCreateView(CreateView):
    model = Azienda
    template_name = 'aziende_form.html'
    fields = '__all__'
    success_url = reverse_lazy('aziende-list')

class AziendeUpdateView(UpdateView):
    model = Azienda
    template_name = 'aziende_form.html'
    fields = '__all__'

    def get_success_url(self):
            return reverse('aziende-detail', kwargs={'pk': self.object.pk})

class AziendeDeleteView(DeleteView):
    model = Azienda
    template_name = 'aziende_confirm_delete.html'
    success_url = reverse_lazy('aziende-list')
