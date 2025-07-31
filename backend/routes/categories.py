from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/categories")
def get_categories():
    try:
        query = supabase.table("ia_tools").select("category")
        query = query.order("category")
        response = query.execute()

        if not response.data:
            return []

        seen = set()
        categories = []
        for row in response.data:
            category = row.get("category")
            if category and category not in seen:
                seen.add(category)
                categories.append(category)

        return categories
    except Exception as e:
        print("❌ Error al obtener categorías:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
