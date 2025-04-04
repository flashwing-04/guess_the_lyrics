/*TODO:
    - back button(s) --> reload?
    -songs more
*/


var currentSong = {};
var guessedWords = [];
var currentMainCategory = "";
var currentSubCategory = "";

document.addEventListener('DOMContentLoaded', init);

function init(){
    var categoryList = document.getElementById('category-list');
    var searchInput = document.getElementById('search-input');

    //Render category-list
    for(const category in songs){
        var categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        var description = songs[category].description
        categoryItem.innerHTML = `<h3>${category}</h3> 
                                  <p>${description}</p>`;
        categoryItem.addEventListener('click', () => selectCategory(category));
        categoryList.appendChild(categoryItem);
    }

    //Search functionality within category
    searchInput.addEventListener('input', () => renderSongList(searchInput.value));
}

function selectCategory(category){
    currentMainCategory = category;

    //if subcategories
    if(typeof songs[category] ===  'object' & !Array.isArray(songs[category])){
        renderSubcategories();
    } else {
        currentSubCategory="";
        document.getElementById('category-selection').style.display = 'none';
        document.getElementById('search-input').style.display = 'block';
        document.getElementById('song-list').style.display = 'block';
        renderSongList();
    }
}

function renderSubcategories(){
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = "";

    for(const subcategory in songs[currentMainCategory]){
        if(subcategory!="description"){
            if(subcategory=="songs"){
                selectSubcategory(subcategory);
            }
            else{
                var subcategoryItem = document.createElement('div');
                subcategoryItem.className = 'category-item';
                subcategoryItem.innerHTML = `<h3>${subcategory}</h3>
                                            <p>click to view songs</p>`;
                subcategoryItem.addEventListener('click', () => selectSubcategory(subcategory));
                categoryList.appendChild(subcategoryItem);
            }
        }
    }
}

function selectSubcategory(subcategory){
    currentSubCategory = subcategory;
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('search-input').style.display = 'block';
    document.getElementById('song-list').style.display = 'block';
    renderSongList();
}

function renderSongList(filter=""){
    var songList = document.getElementById('song-list');
    songList.innerHTML = "";
    var songArray = currentSubCategory ? songs[currentMainCategory][currentSubCategory] : songs[currentMainCategory];
    songArray.filter(song => song.title.toLowerCase().includes(filter.toLowerCase())).forEach((song, index) => {
        var songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `<h4>${song.title}</h4>`;
        songItem.addEventListener('click', () => selectSong(index));
        songList.appendChild(songItem);
    });
}

function selectSong(index){
    var songArray = currentSubCategory ? songs[currentMainCategory][currentSubCategory] : songs[currentMainCategory];
    currentSong = songArray[index];
    startGame();
}

function startGame(){
    guessedWords = Array(currentSong.lyrics.split(' ').length).fill("");
    document.getElementById('song-list').style.display = 'none';
    document.getElementById('search-input').style.display = 'none';
    document.getElementById('song-title').innerText = currentSong.title;
    document.getElementById('guess-input').style.display = 'inline-block';
    document.getElementById('score').style.display = 'inline-block';
    document.getElementById('quit-button').style.display = 'block';
    document.getElementById('restart-button').style.display = 'block';

    renderLyricTable();
    updateScore();
}

function renderLyricTable(){
    var lyricTable = document.getElementById('lyric-table');
    lyricTable.innerHTML ="";

    currentSong.lyrics.split(' ').forEach((word, index) => {
        var cell = document.createElement('tr');

        if(guessedWords[index]== currentSong.lyrics.replace(/[.!'?,-]/g,'').toLowerCase().split(' ')[index]){
            cell.innerText =  currentSong.lyrics.split(' ')[index];
        } else{
            cell.innerText = '\n';
        }

        if(!guessedWords[index]){
            cell.classList.add('missing');
        }
        lyricTable.appendChild(cell);
    });
}

function updateScore(){
    var score = document.getElementById('score');
    var numGuessed =0;
    for(guess of guessedWords) if(guess!='')numGuessed++;
    var numTotal = currentSong.lyrics.split(' ').length;
    score.innerText= numGuessed +"/"+ numTotal;
}

function checkGuess(){
    var userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    var lyricsArray = currentSong.lyrics.replace(/[.!'?,-]/g,'').toLowerCase().split(' ');
    var guessArray = userGuess.split(' ');

    if(!guessedWords.includes(userGuess)){
        var matchFound = false;
        
        lyricsArray.forEach((word, index) => {
            if(guessArray.includes(word)){
                guessedWords[index] = word;
                matchFound = true;
            }});
            

        renderLyricTable();
        updateScore();

        if(matchFound) document.getElementById('guess-input').value = "";
    }

    if(guessedWords.join(' ').toLowerCase() === currentSong.lyrics.replace(/[.,'?!]/g, '').toLowerCase()){
        document.getElementById('result-message').innerText = "Congratulations! You guessed all the lyrics.";
    }
}

function quitGame(){
    currentSong.lyrics.split(' ').forEach((word, index) =>{
        if(!guessedWords.includes(word)){
            var allCells = document.getElementById('lyric-table').children;
            var cell = allCells.item(index);
            cell.innerText =word;
        }
    });
}

function restartGame(){
    guessedWords = [];
    startGame();
    document.getElementById('result-message').innerText='';
}

document.getElementById('header').addEventListener('click', function() {location.reload()});
document.getElementById('quit-button').addEventListener('click', quitGame);
document.getElementById('restart-button').addEventListener('click', restartGame)
document.getElementById('guess-input').addEventListener('input', checkGuess);