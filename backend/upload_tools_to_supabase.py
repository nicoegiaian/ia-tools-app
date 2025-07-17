import os
import json
import httpx
from dotenv import load_dotenv
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

with open("ia_tools_data_full.json", "r", encoding="utf-8") as f:
    data = json.load(f)

tools = []
for category in data:
    category_name = category["category"]
    for tool in category["tools"]:
        tools.append({
            "category": category_name,
            "name": tool["name"],
            "purpose": tool["purpose"],
            "pricing": tool["pricing"],
            "features": tool["features"],
            "learn_url": tool["learn_url"],
            "tool_url": tool["tool_url"]
        })

headers = {
    "apikey": SUPABASE_API_KEY,
    "Authorization": f"Bearer {SUPABASE_API_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

response = httpx.post(
    f"{SUPABASE_URL}/rest/v1/ia_tools",
    headers=headers,
    json=tools
)

if response.status_code in (200, 201, 204):
    print("✅ Datos cargados con éxito en Supabase")
else:
    print("❌ Error al cargar los datos:", response.status_code)
    print(response.text)

