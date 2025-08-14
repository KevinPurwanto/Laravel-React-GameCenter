# Stage 1: Build frontend assets
FROM node:20 AS frontend
WORKDIR /app
COPY package*.json vite.config.* tsconfig.* postcss.config.js tailwind.config.* ./
COPY resources ./resources
RUN npm install && npm run build

# Stage 2: PHP + Laravel
FROM php:8.2-fpm

# Install system dependencies & extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql gd bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Laravel app
COPY . .

# Copy built frontend from first stage
COPY --from=frontend /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
