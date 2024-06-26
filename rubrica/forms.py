# rubrica/forms.py

from django import forms
from .models import Aziende

class AziendeForm(forms.ModelForm):
    class Meta:
        model = Aziende
        fields = '__all__'
