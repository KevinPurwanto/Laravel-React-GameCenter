# Tahap 1: Build React + install PHP dependencies
FROM node:20 AS frontend
WORKDIR /app

# Copy semua file Laravel
COPY . .

# Install dependencies Laravel
RUN corepack enable && npm install && npm run build

# Tahap 2: PHP & Laravel
FROM php:8.3-fpm AS backend

# Install dependencies PHP
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy semua file dari tahap 1 (sudah berisi Laravel + build React di public/)
COPY --from=frontend /app ./

# Install dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Set permission storage & bootstrap
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

# Jalankan Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
