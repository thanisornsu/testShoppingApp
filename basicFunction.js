console.log('This is the login.js file');

let number = [1, 2, 3, 4, 5];

function counting(num) {

    num.forEach( n => {
        console.log("number: ", n);
    });
    for (let i =0; i < num; i++) {
        console.log("start: ",i);
    }   

    for (let number of [10, 20, 30, 40, 50]) {
        console.log(number);
    }
    for (let index in {a: 'apple', b: 'banana', c: 'cherry'}) {
        console.log(index);
    }
    for (let char of "hello") {
        console.log(char);
    }
    for (let char of num) {
        console.log(char);
    }
}

counting(number);


const countingCost = (num) => {
    console.log("Calculating total cost...", num);
    let total = 0;
    for (let n of num) {
        total += n;
        console.log("Current total: ", total);
    }
}

countingCost(number);

const mutiply = (a, b) => a * b;

console.log("Multiplication: ", mutiply(5, 6));