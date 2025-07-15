import { categories } from '../data/categories';

export default function CategoryList({ selected, onSelect }) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cat === selected ? 'selected' : ''}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

