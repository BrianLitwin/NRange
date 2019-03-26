import { makeDataObjects } from "./model2";

var count = 0;

/*

for n / 10 => add 1
for n / 100 => add 9
for n / 1000 => add 100


- 100 =>
- 1,000 =>
  (9 * 9) for one though ninety-nine repeated nine times
  (100) for one-hundred => one-hundred-ninety-nine
  => 181

- 10,000
  181 x 9  for one to nine-hundred-ninety-nine repeated 10 times
  + 1000 for one-thousand through one-thousand-nine-hundred-ninety-nine

  181 x 9 + 1000 = 2629

- 100,000
  [100], [000]

  1,000 * 9


  2629 * 9 for one to ten-thousand repeated 9 times (23661)
  181 * 10 for one through ninety-nine repeated ten times (1810)
  25471

  2629 * 10 - ((9 * 9) * 10) - 9


- 1,000,000

  329239




  repeat 181 above x 10
  81 x 10
  9

if n < 100 => 9
100 + 9*9
1000 + (9 * 9 * 9 ) + (9 * 100)
10000 + (9 * 9 * 9 * 9) + (9 * 1000) - 90
*/

// for each n / 10 => 1
// for each n / 100 => 9
// for each n / 1000 => 100

// 100 * 1
// 10 * 9
// 190

// 1000 * 1
// 100 * 9
// 10 * 100
// 2900

//  1,000 = 9 * 10 + 100 //
//  10,000 = 190 * 10 + 1000 // (1 to 10 i.e.) * 1000
//  100,000 = 190 * 100 + 9 * 1000 // (1 to 100 i.e. 9) * 1000
//  1,000,000 = 190 * 1000 + 190 * 1000 (1 to 1000 i.e. 190 * 1000)
//  380000 * 10 + 1000000

// 10:       1
// 100:      9
// 1000:     190
// 10000:    2900
// 100000:   28000
// 1000000:  380000
// 10,000,000: 4908000

// function get(n) {
//
//
//   // over thousand and < million
//   if (n > 1000) {
//     const thousands = Math.floor(n / 1000)
//     const t = thousands * 190
//     const r = get(thousands) * 1000
//     return t + r
//   } else if (n <= 1000 && n > 100) {
//     hundreds = Math.floor(n / 100)
//     t = hundreds * 9 + 100
//     return t
//   } else if (n <= 100 && n > 10) {
//     return 9
//   } else {
//     return 1
//   }
// }
//
// get(10000000)

// base unit (100: 9, 1000: 190)
// multiplying factor
//

//  1,000 = 9 * 10 + 100 //
//  10,000 = 190 * 10 (each thousand) + 1000 // (1 to 10 i.e. 1) * 1000
//  100,000 = 190 * 100 + 9 * 1000 // (1 to 100 i.e. 9) * 1000
//  1,000,000 = 190 * 1000 + 190 * 1000 (1 to 1000 i.e. 190 * 1000)

export function go() {
  for (var i = 1; i <= 999; i++) {
    const d = makeDataObjects(i);
    const occur = occurances(d.string);
    if (occur > 0) {
      console.log(d.string);
    }
    count += occur;
    if (i === 99) {
      console.log("99: " + count); // 9
    }
    if (i === 999) {
      console.log("999: " + count); // 181
    }
    if (i === 9999) {
      console.log("9999: " + count); // 2629
    }

    if (i === 99999) {
      console.log("99999: " + count); // 25471
    }

    if (i === 999999) {
      console.log("999999: " + count); // 25471
    }

    if (i === 9999999) {
      console.log("9999999: " + count); // 25471
    }

    //999999: 329239
    //9999999:

    // x / 9
    // rem: .1111 i.e. 1/9
    //
  }

  function one(n) {
    if (n < 10) {
      return 9;
    }
  }
}

//
// var arr = [];
//
// function makeArray(n) {
// if (n < 10) {
//     arr.unshift(n);
//     return arr;
//   } else {
//     const d = Math.floor(n / 10);
//     const r = n % 10;
//     arr.unshift(r);
//     makeArray(d, arr);
//   }
// }
//
// console.log(arr)
//
// // increment 10, 100, 1000, 1,000,000, 1,000,000,000 etc
// function increment(d) {
//   if (d < 1000) {
//     return d *= 10
//   } else {
//     for (var p = 3; Math.pow(10, p) <= d; p *= 2) { }
//     return Math.pow(10, p)
//   }
// }
//
// function compare() {
//   var d = 1;
//   for (var i = arr.length - 1; i >= 0; i--) {
//     console.log(d)
//
//     // increment 1,2,3,4,7,10,13, etc
//     if (d >= 1000 && ((i - 1) % 3 === 0)) {
//       d = increment(d)
//     } else if (d < 1000) {
//       d = increment(d)
//     }
//   }
// }
//
// makeArray(1030400)
// compare()
//
