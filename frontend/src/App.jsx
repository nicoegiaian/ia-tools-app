import { useState, useEffect } from 'react';
import Category from './components/CategoryList';

function App() {
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState({});

  const fetchTools = (category) => {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/tools?category=${encodeURIComponent(category)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setExpandedFeatures({});
      })
      .catch((err) => console.error('Error fetching tools:', err))
      .finally(() => setLoading(false));
  };

  const toggleFeatures = (toolId) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-2xl font-bold mb-6">Explorá herramientas de IA</h1>

      <Category
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          fetchTools(cat);
        }}
      />

      {loading && (
        <div className="absolute inset-0 z-10 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="mt-2 text-sm text-blue-600">Cargando herramientas...</span>
          </div>
        </div>
      )}

      {selectedCategory && !loading && (
        <>
          <h2 className="text-xl font-bold mt-6 mb-2">
            Herramientas – {selectedCategory}
          </h2>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {tools.map((tool) => {
                const isExpanded = expandedFeatures[tool.id];
                const features = Array.isArray(tool.features) ? tool.features : [];
                const visibleFeatures = isExpanded ? features : features.slice(0, 3);

                return (
                  <div
                    key={tool.id}
                    className="p-4 border rounded-lg shadow bg-white"
                  >
                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{tool.description}</p>
                    <p className="text-sm mt-2">
                      <strong>Precio:</strong> {tool.pricing}
                    </p>

                    {features.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold mb-1">Features</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {visibleFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        {features.length > 3 && (
                          <button
                            onClick={() => toggleFeatures(tool.id)}
                            className="mt-1 text-blue-500 text-sm underline"
                          >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                          </button>
                        )}
                      </div>
                    )}

                    <div className="mt-2 flex gap-3 text-sm">
                      {tool.tool_url && (
                        <a
                          href={tool.tool_url}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Sitio
                        </a>
                      )}
                      {tool.learn_url && (
                        <a
                          href={tool.learn_url}
                          target="_blank"
                          className="text-green-500 underline"
                        >
                          Capacitación
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-600">
              No se encontraron herramientas para esta categoría.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
