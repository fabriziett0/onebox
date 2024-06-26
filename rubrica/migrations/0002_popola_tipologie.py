from django.db import migrations

def add_sample_data(apps, schema_editor):
    TipoContatto = apps.get_model('rubrica', 'TipoContatto')
    TipoRecapito = apps.get_model('rubrica', 'TipoRecapito')

    tipo_contatti = [
        TipoContatto(etichetta='Cliente'),
        TipoContatto(etichetta='Fornitore'),
        TipoContatto(etichetta='Collaboratore'),
        TipoContatto(etichetta='Vettore'),
        TipoContatto(etichetta='Professionista')
    ]

    tipo_recapiti = [
        TipoRecapito(etichetta='Tel. fisso lavoro'),
        TipoRecapito(etichetta='Tel. fisso personale'),
        TipoRecapito(etichetta='Cell. lavoro'),
        TipoRecapito(etichetta='Cell. personale'),
        TipoRecapito(etichetta='WhatsApp'),
        TipoRecapito(etichetta='Telegram'),
        TipoRecapito(etichetta='Email lavoro'),
        TipoRecapito(etichetta='Email personale'),
        TipoRecapito(etichetta='Email PEC'),
        TipoRecapito(etichetta='Centralino'),
        TipoRecapito(etichetta='Interno')
    ]

    TipoContatto.objects.bulk_create(tipo_contatti)
    TipoRecapito.objects.bulk_create(tipo_recapiti)

class Migration(migrations.Migration):

    dependencies = [
        ('rubrica', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_sample_data),
    ]
