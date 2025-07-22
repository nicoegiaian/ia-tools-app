from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/tools")
def get_tools(category: str = None):
    try:
        query = supabase.table("ia_tools").select("*")
        if category:
            query = query.eq("category", category)
        response = query.execute()
        return response.data
    except Exception as e:
        print("❌ Error al obtener tools:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
