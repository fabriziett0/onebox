from django.contrib import admin
from .models import TipoContatto, TipoRecapito

@admin.register(TipoContatto)
class TipoContattoAdmin(admin.ModelAdmin):
    list_display = ('etichetta', 'attivatore')

@admin.register(TipoRecapito)
class TipoRecapitoAdmin(admin.ModelAdmin):
    list_display = ('etichetta', 'icona', 'colore', 'attivatore')
