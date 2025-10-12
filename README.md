# Guess The Lyrics

**Guess The Lyrics** is an interactive web game that challenges users to test their knowledge of song lyrics. Players select songs, fill in missing lyrics, and track their accuracy as they play.  
This project demonstrates front-end development skills with **React.js**, user interaction design, and dynamic data handling.

**Test the game online with a few pre-added songs:** [Click here](https://flashwing-04.github.io/guess_the_lyrics/)

---

## Table of Contents

- [Project Highlights](#project-highlights)
- [How It Works](#how-it-works)
- [Categories](#categories)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Adding / Changing Songs](#adding--changing-songs)

---

## Project Highlights

- Interactive lyric guessing game with live scoring.
- Supports multiple song categories and future expansion to subcategories.
- Real-time input validation and feedback on correct/incorrect lyrics.
- Built with a clean, responsive UI for web browsers.

---

## How It Works

1. **Select a Category**  
   Choose a music genre (and eventually a subcategory) to start playing.

2. **Pick a Song**  
   Browse a list of available songs in the chosen category and select one.

3. **Guess the Lyrics**  
   Type your guesses into the input fields. Correct guesses appear in the lyric table in real-time.

4. **Track Your Score**  
   The score updates as you correctly guess lyrics, allowing players to see their accuracy instantly.

---

## Categories

*Currently under development* – More genres and subcategories will be added in future updates.

---

## Tech Stack

- **React.js** – Front-end development and dynamic UI rendering
- **Node.js** – Development environment
- **CSS** – Styling and layout design

---

## Getting Started

To run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/guess-the-lyrics.git
   cd guess-the-lyrics
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
4. **Open in browser**  
   Visit http://localhost:3000 to play the game.

---

## Adding/ Changeing Songs

New songs can be added or edited by modifying the `src/songs.js` file.  
Follow the existing data structure to ensure consistent functionality.