from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.categories import router as categories_router  # ✅ Ruta absoluta desde raíz del proyecto
from routes.tools import router as tools_router

import os

app = FastAPI()


origins = [
    "https://ia-tools-app-cloud.vercel.app",  # tu frontend en producción
    "http://localhost:5173",                  # para desarrollo local (Vite)
]
# CORS para que el frontend pueda conectarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # reemplazá con tus dominios en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro del router
app.include_router(categories_router)
app.include_router(tools_router)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

@app.get("/tools")
async def get_tools():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SUPABASE_URL}/rest/v1/ia_tools",
            headers={
                "apikey": SUPABASE_API_KEY,
                "Authorization": f"Bearer {SUPABASE_API_KEY}",
                "Content-Type": "application/json"
            },
            params={"select": "*"}
        )
    response.raise_for_status()
    return response.json()

