import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./numbers";

export function getWordsInNumber(n) {
  const numberArray = makeNumberArray(n);
  const threeDigitArray = formatNumberArraytoThreeDigits(numberArray)
  const words = []
  
  for (var i = 0; i < threeDigitArray.length; i++) {
  
  }
}

// .e.g [1,2,3,4,5,6,7] => [[1], [2,3,4], [5,6,7]]
export function formatNumberArraytoThreeDigits(numberArray) {
  const finalArray = []
  const startNewArray = () => { 
    if (finalArray.length === 0) {
      finalArray.push([])
      return false 
    }
    return finalArray[0].length % 3 === 0
  }
  
  while (numberArray.length > 0) {
    const nextNumber = numberArray.pop()
    if (startNewArray()) {
      finalArray.unshift([nextNumber])
    } else {
      finalArray[0].unshift(nextNumber)
    }
  }
  return finalArray 
}

export function getWordsInNumber(n) {
  const numberArray = makeNumberArray(n);
  const threeDigitArray = formatNumberArraytoThreeDigits(numberArray)
  const finalArray = [threeDigitArray.pop()]; // init w/ the subarray representing "hundreds" 
  
  for (var i = 0; i < returnArray.length; i++) {
      const array = threeDigitArray.pop()
      const arrayString = formatArray(array)
      const powerOfTen = tensPower[i]
      finalArray.unshift(powerOften)
      finalArray.unshift(arrayString)
  }
  
  return finalArray 
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

// returns an array of strings representing a number < 1,000 
//  e.g. numberArray [1,2,3] => ["one", "hundred", "thirty", "four"]
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
