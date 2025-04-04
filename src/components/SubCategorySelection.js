import React from 'react';

export function SubCategorySelection({ songs, category, selectSubCategory }) {
  return (
    <div id="subcategory-selection">
      <div id="subcategory-list">
        {Object.keys(songs[category])
               .filter((key) => key !== 'description' && key !== 'songs')
               .map((subcategory) => (
            <div key={subcategory} className="category-item" onClick={() => selectSubCategory(subcategory)}>
              <h3>{subcategory}</h3>
              <p>Click to view songs</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubCategorySelection;