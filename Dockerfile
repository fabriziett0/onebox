# Dockerfile

FROM python:3.12

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose ports
EXPOSE 8000 80

# Start Gunicorn and Nginx
CMD service nginx start && gunicorn --workers 3 --bind 0.0.0.0:8000 onebox.wsgi:application