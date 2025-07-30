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
        response = (
            supabase.table("ia_tools")
            .select("category", distinct="category")
            .order("category")
            .execute()
        )

        if not response.data:
            return []

        categories = [item["category"] for item in response.data if item.get("category")]
        return categories
    except Exception as e:
        print("❌ Error al obtener categorías:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
