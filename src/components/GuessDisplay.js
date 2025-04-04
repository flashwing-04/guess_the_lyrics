import React, { useState, useEffect } from 'react';

export function GuessDisplay({ currentSong }) {
  const words = currentSong.lyrics.split(' ');
  const wordsNorm = currentSong.lyrics.replace(/[.!'?,-]/g, '').toLowerCase().split(' ');

  const [guessedWords, setGuessedWords] = useState(Array(words.length).fill(''));
  const [inputValue, setInputValue] = useState('');
  const [guessedFlags, setGuessedFlags] = useState(Array(words.length).fill(false));

  useEffect(() => {
    setGuessedWords(Array(words.length).fill(''));
    setGuessedFlags(Array(words.length).fill(false));
    setInputValue('');
  }, [currentSong, words.length]);

  const handleInputChange = (e) => {
    const guess = e.target.value.trim().toLowerCase();

    if (!guess) {
      setInputValue('');
      return;
    }

    var updated = false;
    const updatedGuessedWords = [...guessedWords];
    const updatedFlags = [...guessedFlags];

    wordsNorm.forEach((normalizedWord, index) => {
      if ((!guessedWords[index]) && (normalizedWord === guess || words[index].toLowerCase() === guess)) {
        updatedGuessedWords[index] = words[index];
        updatedFlags[index] = true;
        updated = true;
      }
    });

    if (updated) {
      setGuessedWords(updatedGuessedWords);
      setGuessedFlags(updatedFlags);
      setInputValue('');
    } else {
      setInputValue(guess);
    }
  };

  const restartGame = () => {
    setGuessedWords(Array(words.length).fill(''));
    setGuessedFlags(Array(words.length).fill(false));
    setInputValue('');
  };

  const quitGame = () => {
    setGuessedWords([...words]); 
  };

  const renderLyricTable = () => (
    <tbody>
      {words.map((word, index) => (
        <tr key={index}>
          <td className={guessedFlags[index] ? '' : 'missing'}>
            {guessedWords[index] || ''}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const renderScore = () => {
    const guessedCount = guessedFlags.filter((flag) => flag).length;
    const total = words.length;

    return (
      <span>{guessedCount} / {total}</span>
    );
  };

  return (
    <div id="guess-display">
      <h3 id="song-title">{currentSong.title}</h3>
      <input id="guess-input" type="text" placeholder="Enter your guess" value={inputValue} onChange={handleInputChange}/>

      <p id="score">{renderScore()}</p>
      <div id="lyric-display">
        <table id="lyric-table">{renderLyricTable()}</table>
      </div>

      <button id="restart-button" onClick={restartGame}>Restart</button>
      <button id="quit-button" onClick={quitGame}>Quit</button>
    </div>
  );
}

export default GuessDisplay;
