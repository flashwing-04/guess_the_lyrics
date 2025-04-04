import React from 'react';

export function CategorySelection({ songs, selectCategory }) {
  return (
    <div id="category-selection">
      <div id="category-list">
        {Object.keys(songs).map((category) => (
          <div key={category} className="category-item" onClick={() => selectCategory(category)}>
            <h3>{category}</h3>
            <p>{songs[category].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;