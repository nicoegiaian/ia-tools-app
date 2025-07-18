# backend/routes/categories.py
from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/categories")
def get_categories():
    try:
        response = supabase.table("tools").select("category").execute()
        if not response.data:
            return []
        # Extraer categorías únicas
        categories = list(set([item["category"] for item in response.data if item.get("category")]))
        categories.sort()
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

