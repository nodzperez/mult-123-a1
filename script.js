// grab important elements
const display = document.querySelector('.display'); // calculator screen
const factOutput = document.querySelector('#fact-output'); // section for the fact to be displayed
const buttonGrid = document.querySelector('.button-grid'); 

// store current state
let currentNumber = '';
let selectedType = 'trivia'; 

// make a function to update the screen 
function updateScreen(value) {
  display.value = value || '0'; //0 will be displayed if it is empty except for the first value (placeholder)
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
  if (target.classList.contains('blue-cap-blue')) {
    if (target.textContent === 'Random') {
      fetchFact('random', ''); // fetches a random fact
    } else if (target.textContent === 'C') {
      currentNumber = ''; 
      selectedType = 'trivia'; 
      updateScreen('0');
      factOutput.textContent = 'Press "Get Fact" to reveal something fun!';
      updateFactTypeDisplay(selectedType);
    } else {
      selectedType = target.textContent.toLowerCase(); 
      updateFactTypeDisplay(selectedType);
    }
  }

  // button click event listener for the delete button
  if (target.textContent === 'Del') {
    currentNumber = currentNumber.slice(0, -1);
    updateScreen(currentNumber);
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
    const response = await fetch(`http://numbersapi.com/${number}/${type}`);
    const fact = await response.text(); 
    factOutput.textContent = fact;
  } catch (error) {
    factOutput.textContent = 'Error fetching fact!';
    console.error(error);
  }
}