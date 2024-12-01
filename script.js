// grab important elements
const display = document.querySelector('.display'); // calculator screen
const factOutput = document.querySelector('#fact-output'); // section for the fact to be displayed
const buttonGrid = document.querySelector('.button-grid'); 

// store current state
let currentNumber = '';
let selectedType = 'trivia'; 

// make a function to update the screen 
function updateScreen(value) {
  currentNumber = value.slice(0, 8); // limit the length of currentNumber to 9 digits
  display.value = currentNumber;
}

// make a function to update the fact type
function updateFactTypeDisplay(type) {
  const factTypeDisplay = document.querySelector('#fact-type');
  const colors = {
    trivia: '#0f0',
    math: '#00f',
    year: '#ff0',
    date: '#f00'
  };
  factTypeDisplay.style.color = colors[type] || '#ffd700';
  factTypeDisplay.textContent = type.charAt(0).toUpperCase() + type.slice(1);
}

// make a button click event listener
buttonGrid.addEventListener('click', (event) => {
  const target = event.target;
  
  // button click event listener for the number buttons
  if (target.classList.contains('button-cap') && !isNaN(target.textContent)) {
    currentNumber += target.textContent; 
    updateScreen(currentNumber); 
  }

  // button click event listener for the fact type buttons
  if (target.classList.contains('blue-cap-blue') || target.classList.contains('yellow-cap-yellow') || target.classList.contains('red-cap-red')) {
    if (target.textContent === 'Random') {
      const factTypes = ['trivia', 'math', 'date', 'year'];
      const randomType = factTypes[Math.floor(Math.random() * factTypes.length)];
      fetchFact('random', randomType); // fetches a random fact
      return;
    } else if (target.textContent === 'C') { // button click event listener for the clear button
      currentNumber = ''; 
      selectedType = 'trivia'; 
      updateScreen('');
      factOutput.textContent = 'Press "Get Fact" to reveal something fun!';
      updateFactTypeDisplay(selectedType);
    } else if (target.textContent === 'Del') { // button click event listener for the delete button
      currentNumber = currentNumber.slice(0, -1);
      updateScreen(currentNumber);
    } else {
      selectedType = target.textContent.toLowerCase(); 
      updateFactTypeDisplay(selectedType);
    }
  }

  // button click event listener for the get fact button
  if (target.textContent === 'Get Fact') {
    if (currentNumber) {
      fetchFact(currentNumber, selectedType); 
    } else {
      alert('Please enter a number first!');
    }
  }
});

// function to fetch a fact from the api
async function fetchFact(number, type) {
  try {
    let url = ''

    if (number === 'random') {
      url = `http://numbersapi.com/random/${type}`;
    } else {
      url = `http://numbersapi.com/${number}/${type}`;
    }

    const response = await fetch(url);
    const fact = await response.text(); 
    factOutput.textContent = fact;
  } catch (error) {
    factOutput.textContent = 'Error fetching fact!';
    console.error(error);
  }
}