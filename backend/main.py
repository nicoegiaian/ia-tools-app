from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import httpx
from dotenv import load_dotenv
from routes import categories


load_dotenv()

app = FastAPI()

# CORS para que el frontend acceda
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Reemplazá por tu dominio en prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)

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

