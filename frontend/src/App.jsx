import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import ToolGrid from "./components/ToolGrid";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allTools, setAllTools] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


  useEffect(() => {
      fetch(`${API_URL}/tools`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🛠️ Herramientas recibidas:", data);
        setAllTools(data);
      });
  }, []);

  // ✅ Colocá esta línea acá:
  const filtered = selectedCategory
    ? allTools.filter(
        (t) =>
          t.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      )
    : [];

  console.log("📂 Categoría seleccionada:", selectedCategory);
  console.log("🔍 Resultado filtrado:", filtered);

  return (
    <div className="container">
      <h1>Comparador de Herramientas IA</h1>
      <CategoryList selected={selectedCategory} onSelect={setSelectedCategory} />
      <ToolGrid tools={filtered} />
    </div>
  );
}

export default App;
