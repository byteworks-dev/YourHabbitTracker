# Stage 1: Build-Umgebung
FROM node:20-alpine AS build
WORKDIR /app

# Nur Package-Dateien kopieren für effizientes Caching
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Build-Argumente (werden beim Build-Prozess injiziert)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Umgebungsvariablen für Vite setzen
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# Stage 2: Produktions-Server
FROM nginx:stable-alpine
# Kopiere den Build aus der ersten Stage
COPY --from=build /app/dist /usr/share/nginx/html
# Eigene Nginx-Konfiguration einspielen
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]