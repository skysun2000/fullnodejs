'use strict'

var a=function(a,b,c){
    console.log(arguments);
}

a("abc",2,3);
a("without more",2);

// var pointPrototype = {
//     isAboveDiagonal: function() {
//         return this.y > this.x;
//     }
// }

// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }

// function createPoint(x, y) {
//     var newPoint = Object.create(pointPrototype);
//     Point.apply(newPoint, arguments);
//     return newPoint;
// }

// var myPoint = createPoint(1, 2);


function scopeDemo() {
    //variable hoisting
     for (i = 0; i < 10; ++i) {
      var  j = i * 2;
    }
    console.log(i, j);
}
scopeDemo();


var numbers = [1,2,3,4,5,6,7,8];

var filteredImperatively = [];
for (var i = 0; i < numbers.length; ++i) {
    var number = numbers[i];
    if (number % 2 === 0) {
        filteredImperatively.push(number);
    }
}
console.log(filteredImperatively); // Prints [2, 4, 6, 8]

var filteredFunctionally =
    numbers.filter(function(x) { return x % 2 === 0; });
console.log(filteredFunctionally); // Prints [2, 4, 6, 8]



var filteredFunctionally2 =
    numbers.filter(x=> x % 2 === 0);
console.log(filteredFunctionally2); // Prints [2, 4, 6, 8]