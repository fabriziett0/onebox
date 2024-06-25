# Dockerfile

FROM python:3.12

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# Eseguire le migrazioni e raccogliere i file statici
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn --workers 3 --bind 0.0.0.0:8000 onebox.wsgi:application"]

# Server per sviluppo
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

