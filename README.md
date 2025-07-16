# 📊 Benchmark de Herramientas de IA

Aplicación web para explorar, comparar y aprender sobre herramientas de Inteligencia Artificial, organizadas por categorías de uso.

------

## 🚀 Tecnologías

- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **Base de datos:** Supabase (PostgreSQL vía REST API)
- **Hosting:** Vercel (frontend)
- **CI/CD:** GitHub + Vercel (próximamente)

---

## 🧱 Estructura
ia-tools-app/
├── backend/ # FastAPI (API REST)
├── frontend/ # React (Vite)
├── supabase/ # Script SQL para datos iniciales
└── README.md # Esta guía


---

## 🛠 Instalación local

### 🔧 Requisitos

- Node.js (v18+)
- Python 3.10+
- Supabase (cuenta ya creada)
- Git + GitHub
- Cuenta en Vercel (ya conectada a GitHub)

---

## 📤 Publicar en GitHub

1. Iniciá git en el proyecto:

```bash
cd ia-tools-app
git init
git remote add origin https://github.com/<tu-usuario>/ia-tools-app.git

git add .
git commit -m "primer commit"
git push -u origin main


---

### 📌 Siguientes pasos inmediatos

1. Subí todo a GitHub (si querés, puedo ayudarte con `.gitignore`).
2. Probá el deploy en Vercel (te puedo ayudar si querés preparar `vercel.json`).
3. Luego armamos:
   - 🚦 Workflow de GitHub Actions para CI/CD
   - 🤖 Scraper o recopilador de herramientas IA (20 categorías x 10 herramientas)
   - 🔁 Sistema de actualización semanal automático en Supabase

¿Querés que prepare ahora el `.gitignore` completo y te diga qué subir y qué no al repo?

🖥️ Backend (FastAPI)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# → completar SUPABASE_URL y SUPABASE_API_KEY
uvicorn main:app --reload --host 0.0.0.0 --port 8000


🌐 Frontend (React + Vite)

cd frontend
npm install
cp .env.example .env
# → completar VITE_API_URL con IP de WSL y puerto 8000
npm run dev
