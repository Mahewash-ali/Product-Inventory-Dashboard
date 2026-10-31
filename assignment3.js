// Taking test score as input
let score = Number(prompt("Enter your test score:"));

// Checking the score using if...else
if (score >= 90) {
    console.log("Excellent performance!");
} 
else if (score >= 80) {
    console.log("Good performance!");
} 
else if (score >= 70) {
    console.log("Average performance!");
} 
else {
    console.log("Needs improvement!");
}

// Determining letter grade using switch
let grade;

switch (true) {
    case (score >= 90):
        grade = "A";
        break;

    case (score >= 80):
        grade = "B";
        break;

    case (score >= 70):
        grade = "C";
        break;

    case (score >= 60):
        grade = "D";
        break;

    default:
        grade = "F";
}

// Checking pass or fail using ternary operator
let status = score >= 40 ? "Passed" : "Failed";

// Displaying results
console.log(`Score: ${score}`);
console.log(`Grade: ${grade}`);
console.log(`Status: ${status}`);