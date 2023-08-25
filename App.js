const readline = require('readline');

// Create an interface for reading from and writing to the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Prompt the user to enter a string
rl.question("Please enter a string: ", (userInput) => {
  // Display the entered string

  console.log("You entered:", userInput);
  
  console.log(upper(userInput))

  // Close the readline interface
  rl.close();
});

function upper(string) {
  return string.toUpperCase();
}

// console.log("Hello, World!");

module.exports = upper; //vis-à-vis public