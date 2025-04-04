import React, { useState } from 'react';


export function SongList({ songs, category, subCategory, selectSong }) {
  
    const [inputValue, setInputValue] = useState('');
  
    const songArray = subCategory ? songs[category][subCategory] : songs[category] || [];

    const handleInputChange = (e) => {
      setInputValue(e.target.value.trim().toLowerCase());
    }

    const filteredSongs = songArray.filter((song) =>
      song.title.toLowerCase().includes(inputValue)
    );

  return (
    <div id="song-list">
      <input id="search-input" type="text" placeholder="Search for a Song" value={inputValue} onChange={handleInputChange}/>

      {filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <div key={index} className="song-item" onClick={() => selectSong(song)}>
            <h3>{song.title}</h3>
          </div>
        ))
      ) : (
        <p>No songs available in this category/subcategory.</p>
      )}
    </div>
  );
}

export default SongList;