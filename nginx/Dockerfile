FROM nginx:latest

# config Nginx personnalisée dans le conteneur
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# frontend build (React)
# COPY --from=build /app/build /usr/share/nginx/html #FOR PROD
COPY ./frontend/build /var/www/html/frontend

# backend public (Symfony)
COPY ./backend/src /var/www/html/backend

# port par défaut de Nginx
EXPOSE 80
