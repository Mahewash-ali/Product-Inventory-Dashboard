// Taking input from the user
let billAmount = prompt("Enter your bill amount:");
let tipPercentage = prompt("Enter tip percentage:");

// Explicit type conversion
billAmount = Number(billAmount);
tipPercentage = Number(tipPercentage);

// Calculating the tip
let calculatedTip = billAmount * tipPercentage / 100;

// Calculating the total amount using assignment operator
let totalAmount = billAmount;
totalAmount += calculatedTip;

// Displaying the result
console.log(`Subtotal: $${billAmount}`);
console.log(`Tip Percentage: ${tipPercentage}%`);
console.log(`Calculated Tip: $${calculatedTip}`);
console.log(`Total Amount to Pay: $${totalAmount}`);