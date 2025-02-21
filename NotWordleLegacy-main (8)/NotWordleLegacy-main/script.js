// TODO: Change colors according to light or dark theme
const c_YELLOW = "#c9b458";
const c_GREEN = "#6aaa64";
const c_LIGHTBLUE = "#7cd0eb";
const c_GRAY = "#787c7e";

console.log("First");

/*async function getWords() {
  const baseURL = window.location.origin;
  const requestURL = baseURL + "/words.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  let wordsJSON = await response.json();
  let wordsa = wordsJSON["words"];
  console.log(wordsa[5]);
  console.log(wordsa[500]);
  return wordsa;
}*/

//const baseURL = window.location.origin;
//const requestURL = baseURL + "/NotWordleLegacy/words.json";
//const request = new Request(requestURL);
//const response = await fetch(request);
//let wordsJSON = await response.json();
//let words = wordsJSON["words"];
//console.log(words[5]);
//console.log(words[500]);

//getWords();
console.log("Before");
//let words = [];
//words = getWords();
//console.log(words[Math.floor(Math.random() * words.length)]);
console.log("After");
/*
const response = async fetch(request);
const wordJSON = await response.json();
let words = wordJSON["words"];
*/
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = 0;
let currentGuess = [];
let nextLetter = 0;

//let rightGuessString = words[Math.floor(Math.random() * words.length)];
//console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < 1; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 6; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

initBoard();


document.addEventListener("keyup", (e) => {

  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    console.log("Checking guess");
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});



function questions(){

  var score = 0;

  let q1 = document.createElement("h1");
      q1.setAttribute("id", "placeholder");
      document.getElementById("big_title").appendChild(q1);
      var textContentq1 = "Did you acknowledge what you did?";
      document.getElementById("placeholder").textContent = textContentq1;
      

}

questions();

function evaluate(){

}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  let guessString = "";
  let guessntString = "";
  let rightGuess = Array.from(rightGuessString);
  const wrongAmount = 5;
  let wrongCounter = 0;


  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    toastr.error("Not enough letters! Idiot.");
    return;
  }

  if (!words.includes(guessString)) {
    if (guessString === "myrrh") {
      toastr.error("Myrrh is too good of a word to use.");
      return;
    }
    else if (guessString === "bitch") {
      /*employers skip this part*/
      toastr.error("Watch your mouth you dirty dog.");
      return;
    }
    else if (guessString === "whore") {
      toastr.error("Sex work should be legal but this is not the time.");
      return;
    }
    else {
      toastr.error("Word not in list!");
      return;
    }
  }
  for (let i = 0; i < 5; i++) {
    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    if (letterPosition === -1) {
      wrongCounter += 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = '';
    let box = row.children[i];
    let letter = currentGuess[i];
    let letterPosition = rightGuess.indexOf(currentGuess[i]);


    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = c_GRAY;
    }
    else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position 
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = c_GREEN;
      }
      else {
        letterColor = c_YELLOW;
      }

      rightGuess[letterPosition] = "#";
    }
    if (wrongCounter != wrongAmount) {

      let delay = 250 * i;
      setTimeout(() => {
        //flip box
        animateCSS(box, 'flipInX');
        //shade box
        box.style.backgroundColor = letterColor;
        shadeKeyBoard(letter, letterColor);
      }, delay);
    }
    else {
      let delay = 250 * i;
      setTimeout(() => {
        //flip box
        animateCSS(box, 'flipInX');
        //shade box
        box.style.backgroundColor = c_LIGHTBLUE;
      }, delay);
    }


  }

  if (wrongCounter === wrongAmount) {
    guessntString = rightGuessString;
  }

  // Note that the whole point is to get a word not containing any common letters to the given word
  if (guessntString === rightGuessString) {
    toastr.success("You won! Congrats!");
    toastr.info(`The 'right' word was: "${rightGuessString}"`);
    guessesRemaining = 0;
    return;
  }
  else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;
  }

  if (guessesRemaining === 0) {
    toastr.error("You've run out of guesses! Game over!");
    toastr.info(`The 'right' word was: "${rightGuessString}"`);
    return;
  }

  if (guessString === rightGuessString) {
    toastr.error("The objective isn't to get the correct word!");
    toastr.error("This is Not Wordle! Make a word that contains no letters present in the unknown target word.");
    return;
  }

}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === 'green') {
        return;
      }

      if (oldColor === c_YELLOW && color !== c_GREEN) {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}


document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }));
});

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    node.style.setProperty('--animate-duration', '0.5s');

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
