export default function ToolGrid({ tools }) {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <div key={tool.name} className="tool-card">
          <h3>{tool.name}</h3>
          <p><strong>Precio:</strong> {tool.pricing}</p>
          <p>{tool.purpose}</p>
          <ul>
            {tool.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <p>
            <a href={tool.official_url} target="_blank" rel="noopener noreferrer">Ir al producto</a><br />
            <a href={tool.learning_url} target="_blank" rel="noopener noreferrer">Ver capacitación</a>
          </p>
        </div>
      ))}
    </div>
  );
}

