import Category from './components/Category';
import { useState, useEffect } from 'react';

function App() {
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchTools = (category) => {
    setLoading(true);  // 👉 comienza la carga
    const url = category
      ? `${import.meta.env.VITE_API_URL}/tools?category=${encodeURIComponent(category)}`
      : `${import.meta.env.VITE_API_URL}/tools`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error('Error fetching tools:', err));
      .finally(() => setLoading(false));  // 👉 termina la carga
  };

  useEffect(() => {
    fetchTools(); // carga inicial
  }, []);

return (
  <>
    <Category onSelectCategory={(cat) => {
      setSelectedCategory(cat);
      fetchTools(cat);
    }} />

    <h2 className="text-xl font-bold mt-4">
      Herramientas {selectedCategory ? `– ${selectedCategory}` : ""}
    </h2>

    {loading ? (
      <div className="flex items-center gap-2 text-blue-600 mt-4">
        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"></path>
        </svg>
        Cargando herramientas...
      </div>
    ) : (
      <ul className="mt-4">
        {tools.map((tool) => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    )}
  </>
);

}

export default App;
