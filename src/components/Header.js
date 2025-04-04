import React from 'react';

function Header({ onClick }) {
  return (
    <div id="header" onClick={onClick}>
      <h1>Guess The Lyrics</h1>
    </div>
  );
}

export default Header;
