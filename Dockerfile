# ======================
# Stage 1: Build Frontend
# ======================
FROM node:20 AS frontend
WORKDIR /app

# Copy config & package files
COPY package*.json vite.config.* postcss.config.js tailwind.config.* tsconfig.* ./
# Copy frontend source files
COPY resources ./resources
COPY public ./public

# Install dependencies & build
RUN npm install
RUN npm run build

# ======================
# Stage 2: PHP + Laravel
# ======================
FROM php:8.2-fpm AS backend
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql gd bcmath

# Copy composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Laravel backend files
COPY . .

# Copy built frontend from Stage 1
COPY --from=frontend /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel storage & cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port
EXPOSE 8000

# Start Laravel's built-in server (for Render, use php-fpm + nginx normally)
CMD php artisan serve --host=0.0.0.0 --port=8000
