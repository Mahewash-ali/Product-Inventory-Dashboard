// 1. Multiplication table using for loop

console.log("-- Multiplication Table of 5 --");

for (let i = 1; i <= 5; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
}


// 2. Finding first number greater than 10 divisible by 6

console.log("-- First number > 10 divisible by 6 --");

let num = 11;

while (true) {
    if (num > 10 && num % 6 === 0) {
        console.log(`Found: ${num}`);
        break;
    }

    num++;
}


// 3. Skipping numbers using do...while and continue

console.log("-- Skipping numbers using continue --");

let count = 0;

do {
    count++;

    if (count === 3 || count === 5) {
        continue;
    }

    console.log(count);

} while (count < 7);