$(document).ready(function () { //wait for the document to fully load
  // grab important elements
  const $display = $(".display"); // calculator screen
  const $factOutput = $("#fact-output"); // section for the fact to be displayed
  const $buttonGrid = $(".button-grid");

  // store current state
  let currentNumber = "";
  let selectedType = "trivia";

  // make a function to update the screen
  function updateScreen(value) {
    currentNumber = value.slice(0, 8); // limit the length of currentNumber to 8 digits
    $display.val(currentNumber || ""); // Avoid displaying '0' when cleared
  }

  // make a function to update the fact type
  function updateFactTypeDisplay(type) {
    const $factTypeDisplay = $("#fact-type");
    const colors = {
      trivia: "#0f0",
      math: "#00f",
      year: "#ff0",
      date: "#f00",
    };
    $factTypeDisplay.css("color", colors[type] || "#ffd700");
    $factTypeDisplay.text(type.charAt(0).toUpperCase() + type.slice(1));
  }

  // make a button click event listener
  $buttonGrid.on("click", ".button-cap", function () {
    const $target = $(this);

    // Handle the 'Random' button
    if ($target.text().trim() === "Random") {
      fetchFact('random', ''); // Fetches a random fact
      return;
    }

    // button click event listener for the number buttons
    if (!isNaN($target.text()) && $target.text().trim() !== "") {
      currentNumber += $target.text();
      updateScreen(currentNumber);
      return;
    }

    // button click event listener for the fact type buttons
    if ($target.hasClass("blue-cap-blue") || $target.hasClass("red-cap-red")) {
      if ($target.text().trim() === "C") {
        // Clear button
        currentNumber = "";
        selectedType = "trivia";
        updateScreen("");
        $factOutput.text('Press "Get Fact" to reveal something fun!');
        updateFactTypeDisplay(selectedType);
      } else if ($target.text().trim() === "Del") {
        // Delete button
        currentNumber = currentNumber.slice(0, -1);
        updateScreen(currentNumber);
      } else {
        selectedType = $target.text().toLowerCase().trim();
        updateFactTypeDisplay(selectedType);
      }
      return;
    }

    // button click event listener for the 'Get Fact' button
    if ($target.text().trim() === "Get Fact") {
      if (currentNumber) {
        fetchFact(currentNumber, selectedType);
      } else {
        alert("Please enter a number first!");
      }
    }
  });

  // function to fetch a fact from the api
  async function fetchFact(number, type) {
    try {
      const response = await fetch(`http://numbersapi.com/${number}/${type}`);
      const fact = await response.text();
      $factOutput.text(fact);
    } catch (error) {
      $factOutput.text("Error fetching fact!");
      console.error(error);
    }
  }
});