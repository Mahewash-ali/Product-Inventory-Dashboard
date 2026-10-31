// 1. Standard function with default parameters

function calculateArea(length = 5, width = 4) {
    return length * width;
}

let standardArea = calculateArea();

console.log(`Standard Function Area (Default 5x4): ${standardArea}`);


// 2. Arrow function with default parameters

const calculateAreaArrow = (length = 5, width = 4) => {
    return length * width;
};

let arrowArea = calculateAreaArrow(10, 3);

console.log(`Arrow Function Area (Custom 10x3): ${arrowArea}`);


// 3. Demonstrating function and block scope

function scopeTest() {
    var functionVar = "I am function scoped";

    if (true) {
        let blockVar = "I am block scoped";

        console.log(blockVar);
    }

    console.log(functionVar);

    // Trying to access blockVar outside its block
    try {
        console.log(blockVar);
    } catch (error) {
        console.log(`Scope Test Error: ${error}`);
    }
}

scopeTest();