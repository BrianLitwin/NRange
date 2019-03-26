import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./numbers";

export function getWordsInNumber(n) {
  const numberArray = makeNumberArray(n);
}

// returns an array of digits 
// e.g. n = 1234 => [1,2,3,4]
export function makeNumberArray(n, array = []) {
  if (n < 10) {
    array.unshift(n);
    return array;
  } else {
    const d = Math.floor(n / 10);
    const r = n % 10;
    array.unshift(r);
    return makeNumberArray(d, array);
  }
}

// returns an array of strings representing a number 
//  e.g. numberArray [1,2,3,4] => ["one", "thousand", "two", "hundred", "thirty", "four"]
export function formatArrays(numberArray, stringArray) {
  const len = numberArray.length;

  if (numberArray[0] === 0) {
    numberArray.shift();
    return formatArrays(numberArray, stringArray);
  }

  if (len === 0) {
    return;
  }

  if (len === 2) {
    // less than 10 e.g. [0,1]
    if (numberArray[0] === 0 && numberArray[1] != 0) {
      stringArray.push(numberArray[1]);
      numArr = [];

      // between 10 and 19
    } else if (numberArray[0] === 1) {
      stringArray.push(tenToNineteen[numberArray[1]]);
      numArr = [];
    } else {
      // between 20 and 99
      stringArray.push(tensMultiple[numberArray[0] - 2]);
      numberArray.shift();
      formatArrays(numberArray, stringArray);
    }
  } else if (len === 1) {
    if (numberArray[0] != 0) {
      stringArray.push(singleDigits[numberArray.shift() - 1]);
    }
  } else {
    // three digits >= 100
    const firstD = numberArray[0];
    const firstDigit = singleDigits[numArr[0] - 1];
    //strArr.push(`${firstDigit}hundred`);
    stringArray.push(firstDigit);
    stringArray.push("hundred");
    numberArray.shift();
    formatArrays(numberArray, stringArray);
  }
}
