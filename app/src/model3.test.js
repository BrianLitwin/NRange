import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./stringDataArrays";

import { splitIntoThrees, makeDataObjects, countChars } from "./model2";

function getActiveNumbers(data) {
  const activeNumbers = [];
  const add = (string, i, n) => {
    if (activeNumbers.length <= n) {
      activeNumbers.push([]);
    }
    activeNumbers[n].push({ string, n: i });
  };

  // counting single digits

  const n = data.hundreds * 100 + data.tens * 10 + data.single;

  // could refactor to be more efficient
  for (var i = 1; i < 10; i++) {
    if (n >= i) {
      add(singleDigits[i - 1], i, 0);
    } else {
      return activeNumbers;
    }
  }

  for (var i = 10; i < 20; i++) {
    if (n >= i) {
      add(tenToNineteen[i - 10], i, 1);
    } else {
      return activeNumbers;
    }
  }

  for (var i = 20; i < 100; i += 10) {
    if (n >= i) {
      const divisor = Math.floor(i / 10 - 2);
      add(tensMultiple[divisor], i, 2);
    } else {
      return activeNumbers;
    }
  }

  if (n > 99) {
    add("hundred", 100, 3);
  } else {
    return activeNumbers;
  }

  for (var i = 3; i <= 30; i += 3) {
    const num = Math.pow(10, i);
    if (n >= num) {
      //console.log(activeNumbers);
      add(tensPower[i / 3 - 1], num, 4);
    } else {
      return activeNumbers;
    }
  }

  return activeNumbers;
}

function getDataObject(n) {
  const hundreds = Math.floor(n / 100);
  const tens = Math.floor((n - hundreds * 100) / 10);
  const single = n - (tens * 10 + hundreds * 100);
  return { hundreds, tens, single };
}

function getOverThousand(data, n) {}

function getHundreds(data) {
  if (data.hundreds < 1) {
    return 0;
  }
  return 1 + data.hundreds * 100 + data.tens * 10 + data.single - 100;
}

// n = twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety
function getMultiplesOfTen(data, n) {
  var count = data.hundreds * 10;
  if (10 * data.tens > n) {
    count += 10;
  } else if (10 * data.tens === n) {
    count += data.single + 1;
  }
  return count;
}

// n > 9 && n < 20
function getTeens(data, n) {
  var count = data.hundreds;

  if (data.tens > 1) {
    count += 1;
  }
  if (data.tens === 1) {
    if (10 + data.single >= n) {
      count += 1;
    }
  }

  return count;
}

// n < 10
function getSingleDigits(data, n) {
  var count = 0;

  if (data.hundreds > 0) {
    count += data.hundreds * 9; // will pass n 9 times for each hundred
  }

  if (data.hundreds > n) {
    count += 100; // will go from n hundred to n hundredNinetyNine
  }

  // eg n = 9, comp n = 951 => ninehundred x 51
  if (data.hundreds === n) {
    count += data.tens * 10 + data.single + 1;
  }

  // have to skip the teens
  if (data.tens === 1) {
    count += 1;
    return count;
  } else if (data.tens > 1) {
    count += data.tens - 1;
  }

  count += data.single >= n ? 1 : 0;
  return count;
}

// const preComputed1 = [
//   characterCountInNum(999),
//   characterCountInNum(999999),
//   characterCountInNum(999999999),
//   characterCountInNum(999999999999),
//   characterCountInNum(999999999999999),
//   characterCountInNum(999999999999999999),
//   characterCountInNum(999999999999999999999),
//   characterCountInNum(999999999999999999999999),
//   characterCountInNum(999999999999999999999999999),
//   characterCountInNum(999999999999999999999999999999)
// ];

export function characterCountInNum(n, charMap = new Map(), multiplier = 1) {
  // temporary spot for this
  // TODO: change
  console.log("calling with " + n);

  const dataObject = getDataObject(n);
  const activeNumbers = getActiveNumbers(dataObject);

  for (var i = 0; i < activeNumbers.length; i++) {
    const array = activeNumbers[i];

    function count(f) {
      for (const j of array) {
        const reps = f(dataObject, j.n) * multiplier;
        countChars(j.string, charMap, reps);
      }
    }
    switch (i) {
      case 0:
        count(getSingleDigits);
        break;
      case 1:
        count(getTeens);
        break;
      case 2:
        count(getMultiplesOfTen);
        break;
      case 3:
        count(getHundreds);
        break;

      default:
        //over 1,000

        const temp = [];
        makeArray(n, temp);
        const nestedArray = splitIntoThrees(temp);
        //
        const joinCharMap = (a, b) => {
          a.forEach((v, k) => {
            b.set(v, k + b.get(v));
          });
        };

        console.log(nestedArray);

        // count the repetitions of, e.g., "thousands"
        for (var j = 0; j < nestedArray.length - 1; j++) {
          countChars(tensPower[j], charMap, 1);
        }

        // // 11,198 => multiply precomputed[0] by
        //
        //for (var i = 0; i < nestedArray.length; i++) {
        // TODO => this is incorrect, needs to be 999 * something
        // const preCompCharMap = characterCountInNum(999);
        // const array = nestedArray[i];
        //
        // if (i >= nestedArray.count - 2) {
        //   joinCharMap(preCompCharMap, charMap);
        // } else {
        // }
        //}

        const num = Math.pow(10, 3 * (i - 3));
        console.log("num " + num);
        const d = n % num;
        console.log("d " + d);
        const r = Math.floor(n / num);
        console.log("r " + r);
        const multiplier = Math.pow(10, 3 * (i - 4));

        if (num === 1000) {
          characterCountInNum(r, charMap, 1);
        } else {
          characterCountInNum(r, charMap, Math.pow(10, 3 * (i - 4)));
        }
        //
        // const charMap = characterCountInNum(n, charMap);
        break;
    }
  }
  return charMap;
}

function makeArray(n, arr) {
  if (n < 10) {
    arr.unshift(n);
    return arr;
  } else {
    const d = Math.floor(n / 10);
    const r = n % 10;
    arr.unshift(r);
    makeArray(d, arr);
  }
}
//
// describe("", () => {
//   describe("helper methods", () => {
//     it("getting data objects", () => {
//       expect(getDataObject(0)).toEqual({ hundreds: 0, tens: 0, single: 0 });
//       expect(getDataObject(1)).toEqual({ hundreds: 0, tens: 0, single: 1 });
//       expect(getDataObject(20)).toEqual({ hundreds: 0, tens: 2, single: 0 });
//       expect(getDataObject(31)).toEqual({ hundreds: 0, tens: 3, single: 1 });
//       expect(getDataObject(100)).toEqual({ hundreds: 1, tens: 0, single: 0 });
//       expect(getDataObject(100)).toEqual({ hundreds: 1, tens: 0, single: 0 });
//       expect(getDataObject(206)).toEqual({ hundreds: 2, tens: 0, single: 6 });
//       expect(getDataObject(217)).toEqual({ hundreds: 2, tens: 1, single: 7 });
//       expect(getDataObject(999)).toEqual({ hundreds: 9, tens: 9, single: 9 });
//     });
//
//     it("", () => {
//       expect(characterCountInNum(123).get("e")).toBe(233);
//     });
//
//     it("get relevant numbers in range", () => {
//       const result = n => {
//         const nestedArrays = getActiveNumbers(getDataObject(n));
//         const array = nestedArrays[nestedArrays.length - 1];
//         return array[array.length - 1];
//       };
//
//       const activeNumbers = getActiveNumbers(getDataObject(1234));
//
//       for (var i = 0; i < activeNumbers.length; i++) {}
//
//       expect(result(3)).toEqual({ string: "three", n: 3 });
//       expect(result(9)).toEqual({ string: "nine", n: 9 });
//       expect(result(10)).toEqual({ string: "ten", n: 10 });
//       expect(result(11)).toEqual({ string: "eleven", n: 11 });
//       expect(result(30)).toEqual({ string: "thirty", n: 30 });
//       expect(result(51)).toEqual({ string: "fifty", n: 50 });
//       expect(result(99)).toEqual({ string: "ninety", n: 90 });
//       expect(result(100)).toEqual({ string: "hundred", n: 100 });
//       expect(result(999)).toEqual({ string: "hundred", n: 100 });
//       expect(result(1000)).toEqual({
//         string: "thousand",
//         n: Math.pow(10, 3)
//       });
//       expect(result(123123)).toEqual({
//         string: "thousand",
//         n: Math.pow(10, 3)
//       });
//       expect(result(9123123)).toEqual({
//         string: "million",
//         n: Math.pow(10, 6)
//       });
//       expect(result(9111222333)).toEqual({
//         string: "billion",
//         n: Math.pow(10, 9)
//       });
//     });
//
//     it.only("counting occurances of digits", () => {
//       function manualCheckAll(string, n) {
//         //console.log("checking for " + string);
//         var count = 0;
//         for (var i = 1; i <= n; i++) {
//           var nestedArray = makeDataObjects(i).nArray;
//           for (var array of nestedArray) {
//             for (var elem of array) {
//               if (elem === string) {
//                 count += 1;
//               }
//             }
//           }
//         }
//         return count;
//       }
//
//       function check(n, occ, string) {
//         const data = getDataObject(n);
//         var expected = manualCheckAll(string, n);
//
//         //console.log(string);
//         var result;
//         if (occ < 10) {
//           result = getSingleDigits(data, occ);
//         }
//         if (occ >= 10 && occ < 20) {
//           result = getTeens(data, occ);
//         }
//         if (occ >= 20 && occ <= 100) {
//           result = getMultiplesOfTen(data, occ);
//         }
//
//         if (expected != result) {
//           console.log(expected, result);
//           console.log(`check ${n} for ${occ}`);
//         }
//         expect(result).toBe(expected);
//         //expect(expected === result).toBe(true);
//         //return getSingleDigits(data, occ) == manualCheck("string");
//       }
//
//       function manualCheck(n) {
//         console.log("seen " + n);
//
//         const charMap = new Map();
//
//         var count = 0;
//
//         const increment = (map, char) => {
//           const hasChar = map.get(char);
//           if (hasChar) {
//             map.set(char, map.get(char) + 1);
//           } else {
//             map.set(char, 1);
//           }
//         };
//
//         for (var i = 1; i <= n; i++) {
//           var nestedArray = makeDataObjects(i).nArray;
//           for (var array of nestedArray) {
//             for (var elem of array) {
//               for (var j = 0; j < elem.length; j++) {
//                 const letter = elem.charAt(j);
//                 increment(charMap, letter);
//               }
//             }
//           }
//         }
//         return charMap;
//       }
//
//       function compareMaps(map1, map2) {
//         var testVal;
//         if (map1.size !== map2.size) {
//           return false;
//         }
//         for (var [key, val] of map1) {
//           testVal = map2.get(key);
//           if (testVal !== val) {
//             console.log(key, testVal, val);
//           }
//
//           if (testVal !== val || (testVal === undefined && !map2.has(key))) {
//             return false;
//           }
//         }
//         return true;
//       }
//
//       expect(1).toBe(1);
//       var manual = manualCheck(1000);
//       var result = characterCountInNum(1000);
//       console.log(manual);
//       console.log(result);
//
//       console.log("padding");
//       console.log("padding");
//       console.log("padding");
//       console.log("padding");
//       //compareMaps(manual, result);
//
//       // for (var i = 1; i <= 999; i++) {
//       //   for (var j = 1; j <= 19; j++) {
//       //     // number to check against, occurance, string
//       //     // i.e. looking for j in i
//       //     check(i, j, makeDataObjects(j).string);
//       //   }
//       // }
//
//       //
//       //   for (var i = 1; i <= 999; i++) {
//       //     for (var j = 1; j <= 19; j++) {
//       //       // number to check against, occurance, string
//       //       // i.e. looking for j in i
//       //       check(i, j, makeDataObjects(j).string);
//       //     }
//       //   }
//       //
//       //   // multiples of ten
//       //   for (var i = 1; i <= 999; i++) {
//       //     for (var j = 20; j <= 99; j += 10) {
//       //       // number to check against, occurance, string
//       //       // i.e. looking for j in i
//       //       check(i, j, makeDataObjects(j).string);
//       //     }
//       //   }
//       //
//       //   for (var i = 1; i <= 999; i++) {
//       //     const result = getHundreds(getDataObject(i));
//       //     const expected = manualCheck("hundred", i);
//       //     if (result != expected) {
//       //       // console.log(expected, result);
//       //       // console.log(i);
//       //     }
//       //     expect(result).toBe(expected);
//       //   }
//     });
//   });
// });
