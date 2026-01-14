# YourHabbitTracker 🚀

Ein moderner Habit-Tracker, der dir hilft, tägliche Gewohnheiten zu verfolgen und Beständigkeit aufzubauen. Das Projekt ist vollständig dockerisiert und verfügt über eine automatisierte CI/CD-Pipeline.

---

## ✨ Features

- **Cloud-Synchronisierung:** Dank Supabase (PostgreSQL) sind deine Daten überall verfügbar.
- **Authentifizierung:** Sicherer Login und Registrierung.
- **Modernes UI:** Glassmorphism-Effekt und sanfte Pastellfarben mit Tailwind v4.
- **Heatmap:** Visuelle Darstellung deiner Beständigkeit.
- **Docker-Ready:** Einfaches Deployment und lokale Entwicklung via Docker.
- **CI/CD:** Automatisierte Builds und Tests via GitHub Actions.

---

## 🛠️ Schnellstart (Der einfachste Weg)

Voraussetzung: [Docker Desktop](https://www.docker.com/products/docker-desktop/) ist installiert.

1. **Repository klonen:**

   ```bash
   git clone [https://github.com/byteworks-dev/YourHabbitTracker.git](https://github.com/byteworks-dev/YourHabbitTracker.git)
   cd YourHabbitTracker

   ```

2. **Umgebungscariablen einrichten**
   VITE_SUPABASE_URL=deine_supabase_url
   VITE_SUPABASE_ANON_KEY=dein_supabase_anon_key

3. App mit Docker starten:
   docker compose up -Builds

💻 Manuelle Installation (Entwicklung)

1. Abhängigkeiten installieren
   - npm install
2. Entwicklungsumgebungg starten
   - npm run dev

🏗️ Tech Stack & DevOps

    Frontend: React, JavaScript, Tailwind CSS v4

    Backend-as-a-Service: Supabase (Auth & Database)

    Containerisierung: Docker & Docker Compose

    Webserver: Nginx (im Produktions-Image)

    CI/CD: GitHub Actions (Node Build & Docker Build Check)

🛣️ Roadmap

    [ ] Erinnerungen per E-Mail

    [ ] Dark Mode Support

    [ ] Mobile Optimierung & PWA
