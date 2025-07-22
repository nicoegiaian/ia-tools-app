from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/tools")
def get_tools():
    try:
        response = supabase.table("ia_tools").select("*").execute()
        return response.data
    except Exception as e:
        print("❌ Error al obtener tools:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
