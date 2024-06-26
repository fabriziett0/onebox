from django.db import models
from django.core.validators import RegexValidator

class TipoContatto(models.Model):
    etichetta = models.CharField(max_length=100)
    attivatore = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.etichetta

class TipoRecapito(models.Model):
    etichetta = models.CharField(max_length=100)
    icona = models.CharField(max_length=100, blank=True, null=True)
    colore = models.CharField(max_length=100, blank=True, null=True)
    attivatore = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.etichetta

class Azienda(models.Model):
    ragione_sociale = models.CharField(max_length=255)
    abbreviazione = models.CharField(max_length=50, blank=True, null=True)
    partita_iva = models.CharField(
        max_length=13, 
        unique=True, 
        validators=[RegexValidator(
            regex='^IT[0-9]{11}$', 
            message='La partita IVA deve essere nel formato IT00000000000'
        )]
    )
    codice_fiscale = models.CharField(max_length=16, blank=True, null=True)
    indirizzo_pec = models.EmailField(blank=True, null=True)
    codice_sdi = models.CharField(max_length=7, blank=True, null=True)
    attivo = models.BooleanField(default=True)
    bloccato = models.BooleanField(default=False)
    sedeMain_riferimento = models.CharField(max_length=255, blank=True, null=True)
    sedeMain_indirizzo = models.CharField(max_length=255, blank=True, null=True)
    sedeMain_numero_civico = models.CharField(max_length=10, blank=True, null=True)
    sedeMain_cap = models.CharField(max_length=5, validators=[RegexValidator(
        regex='^[0-9]{5}$', 
        message='Il CAP deve essere di 5 cifre'
    )], blank=True, null=True)
    sedeMain_citta = models.CharField(max_length=100, blank=True, null=True)
    sedeMain_provincia = models.CharField(max_length=100, blank=True, null=True)
    sedeMain_telefono = models.CharField(max_length=20, blank=True, null=True)
    sedeMain_email = models.EmailField(blank=True, null=True)
    sedeMain_info_mittente = models.CharField(max_length=255, blank=True, null=True)
    sedeMain_info_edificio = models.CharField(max_length=255, blank=True, null=True)
    sedeLegal_indirizzo = models.CharField(max_length=255, blank=True, null=True)
    sedeLegal_numero_civico = models.CharField(max_length=10, blank=True, null=True)
    sedeLegal_cap = models.CharField(max_length=5, validators=[RegexValidator(
        regex='^[0-9]{5}$', 
        message='Il CAP deve essere di 5 cifre'
    )], blank=True, null=True)
    sedeLegal_citta = models.CharField(max_length=100, blank=True, null=True)
    sedeLegal_provincia = models.CharField(max_length=100, blank=True, null=True)
    sedeLegal_telefono_principale = models.CharField(max_length=20, blank=True, null=True)
    sedeLegal_email_principale = models.EmailField(blank=True, null=True)
    sedeLegal_info_mittente = models.CharField(max_length=255, blank=True, null=True)
    sedeLegal_info_edificio = models.CharField(max_length=255, blank=True, null=True)
    tipo_contatto = models.ManyToManyField(TipoContatto, blank=True)

    def __str__(self):
        return self.ragione_sociale
