import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import { NavBar } from './components/NavBar';
import Header from './components/Header';
import CategorySelection from './components/CategorySelection';
import SubCategorySelection from './components/SubCategorySelection';
import SongList from './components/SongList';
import GuessDisplay from './components/GuessDisplay';

import songs from './songs';

function App() {

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const hasSubcategories = (category) => {
    const keys = Object.keys(songs[category]);
    return keys.some(key => key !== 'description' && key !== 'songs');
  };

  const selectCategory = (category) => {
    setCurrentCategory(category);

    if (hasSubcategories(category)) {
      setCurrentSubCategory(null);
    } else {
      setCurrentSubCategory('songs');
    }
  };

  const selectSubCategory = (subcategory) => {
    setCurrentSubCategory(subcategory);
  };

  const selectSong = (song) => {
    setCurrentSong(song);
  };

  const reset = () => {
    setCurrentCategory(null);
    setCurrentSubCategory(null);
    setCurrentSong(null);
  };

  return (
    <div className="App">
      <NavBar/>
      <Header onClick={reset} />

      <div id="container">
        {!currentCategory && !currentSubCategory && !currentSong && (
          <CategorySelection songs={songs} selectCategory={selectCategory} />
        )}

        {currentCategory && currentSubCategory === null && !currentSong && hasSubcategories(currentCategory) && (
          <SubCategorySelection songs={songs} category={currentCategory} selectSubCategory={selectSubCategory}
          />
        )}

        {currentCategory && currentSubCategory && !currentSong && (
          <SongList songs={songs} category={currentCategory} subCategory={currentSubCategory} selectSong={selectSong}/>
        )}

        {currentSong && (
          <GuessDisplay songs={songs} currentCategory={currentCategory} currentSubCategory={currentSubCategory} currentSong={currentSong}/>
        )}
      </div>

    </div>
  );
};

export default App;
