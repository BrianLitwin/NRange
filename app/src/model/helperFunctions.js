import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./numbers";

export function getWordsInNumber(n) {
  const numberArray = makeNumberArray(n);
  const threeDigitArray = formatNumberArraytoThreeDigits(numberArray);
  const finalArray = []; // init w/ the subarray representing "hundreds"

  while (threeDigitArray.length > 0) {
    const array = threeDigitArray.shift();
    const arrayToAdd = formatArray(array);

    if (arrayToAdd.length === 0) {
      continue;
    }

    if (threeDigitArray.length > 0) {
      arrayToAdd.push(tensPower[threeDigitArray.length - 1]);
    }

    finalArray.push(arrayToAdd);
  }

  return finalArray;
}

// .e.g [1,2,3,4,5,6,7] => [[1], [2,3,4], [5,6,7]]
export function formatNumberArraytoThreeDigits(numberArray) {
  const finalArray = [];
  const startNewArray = () => {
    if (finalArray.length === 0) {
      finalArray.push([]);
      return false;
    }
    return finalArray[0].length % 3 === 0;
  };

  while (numberArray.length > 0) {
    const nextNumber = numberArray.pop();
    if (startNewArray()) {
      finalArray.unshift([nextNumber]);
    } else {
      finalArray[0].unshift(nextNumber);
    }
  }
  return finalArray;
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
export function formatArray(numberArray, stringArray = []) {
  const len = numberArray.length;

  if (numberArray[0] === 0) {
    numberArray.shift();
    return formatArray(numberArray, stringArray);
  }

  if (len === 0) {
    return stringArray;
  }

  if (len === 2) {
    // less than 10 e.g. [0,1]
    if (numberArray[0] === 0 && numberArray[1] !== 0) {
      stringArray.push(numberArray[1]);
      numberArray = [];

      // between 10 and 19
    } else if (numberArray[0] === 1) {
      stringArray.push(tenToNineteen[numberArray[1]]);
      numberArray = [];
    } else {
      // between 20 and 99
      stringArray.push(tensMultiple[numberArray[0] - 2]);
      numberArray.shift();
      formatArray(numberArray, stringArray);
    }
  } else if (len === 1) {
    if (numberArray[0] !== 0) {
      stringArray.push(singleDigits[numberArray.shift() - 1]);
    }
  } else {
    // three digits >= 100

    const firstDigit = singleDigits[numberArray[0] - 1];
    //strArr.push(`${firstDigit}hundred`);
    stringArray.push(firstDigit);
    stringArray.push("hundred");
    numberArray.shift();
    formatArray(numberArray, stringArray);
  }
  return stringArray;
}

// returns the string representations of numbers used
export function getActiveNumbers(n) {
  const activeNumbers = [];
  const add = (string, i, n) => {
    if (activeNumbers.length <= n) {
      activeNumbers.push([]);
    }
    activeNumbers[n].push({ string, n: i });
  };

  // counting single digits

  for (var a = 1; a < 10; a++) {
    if (n >= a) {
      add(singleDigits[a - 1], a, 0);
    } else {
      return activeNumbers;
    }
  }

  // teens
  for (var b = 10; b < 20; b++) {
    if (n >= b) {
      add(tenToNineteen[b - 10], b, 1);
    } else {
      return activeNumbers;
    }
  }

  // 20 - 100
  for (var c = 20; c < 100; c += 10) {
    if (n >= c) {
      const divisor = Math.floor(c / 10 - 2);
      add(tensMultiple[divisor], c, 2);
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
      add(tensPower[i / 3 - 1], num, 4);
    } else {
      return activeNumbers;
    }
  }

  return activeNumbers;
}

export function countChars(chars, charMap = new Map(), extraReps = 1) {
  const increment = (charMap, char) => {
    const charCount = charMap.get(char);
    if (charCount) {
      charMap.set(char, charCount + extraReps);
    } else {
      charMap.set(char, extraReps);
    }
  };
  [...chars].forEach(char => increment(charMap, char));
  return charMap;
}
