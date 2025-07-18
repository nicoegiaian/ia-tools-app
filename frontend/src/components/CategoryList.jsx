// src/components/Category.jsx
import { useEffect, useState } from 'react';

function Category({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-300"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Category;
