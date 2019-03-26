import {
  countChars,
  getWordsInNumber,
  getActiveNumbers
} from "./helperFunctions";
import {
  getSingleDigits,
  getTeens,
  getMultiplesOfTen,
  getHundreds
} from "./getDigitCounts";

import { tensPower } from "./numbers";

// returns a count of each character in a string up to n
// n must be less than 1000

export function getCharsInNumber(n) {
  const numberMap = getNumberMap(n);
  const charMap = new Map();
  numberMap.forEach((v, k) => {
    countChars(k, charMap, v);
  });
  return charMap;
}

export function getNumberMap_UnderOneThousand(n) {
  const activeNumbers = getActiveNumbers(n);
  const numberMap = new Map();

  for (var i = 0; i < activeNumbers.length; i++) {
    const array = activeNumbers[i];

    function count(f) {
      for (var j = 0; j < array.length; j++) {
        const elem = array[j];
        const reps = f(n, elem.n);
        addToMap(elem.string, reps, numberMap);
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
        break;
    }
  }

  return numberMap;
}

export function getNumberMap(n) {
  const originalN = n;
  const numberMaps = [];
  var i = 1;
  var remainder = n;

  if (n > 999) {
    const power = Math.pow(10, i * 3);
    const d = Math.floor(n / power);
    remainder = n % power;

    // determine number of "thousands" (or millions, billions, etc) in number-string
    const getThousands = () => {
      const nOfThousands = originalN - (power - 1);
      const map = new Map();
      map.set(tensPower[i - 1], nOfThousands);
      numberMaps.push(map);
    };

    getThousands();

    const getLastDigitSequence = () => {
      const map = new Map();
      const lastNumberArray = getWordsInNumber(d);
      for (const array of lastNumberArray) {
        for (const elem of array) {
          const amtToAdd = n - d * power + 1;
          if (map.has(elem)) {
            map.set(elem, map.get(elem) + amtToAdd);
          } else {
            map.set(elem, amtToAdd);
          }
        }
      }
      numberMaps.push(map);
    };

    getLastDigitSequence();

    // get "one"s in "onethousnd", "onethousandone", etc.
    const getDigitsUpTOLastSequence = () => {
      const map = getNumberMap_UnderOneThousand(d - 1);
      map.forEach((v, k) => {
        map.set(k, v * power);
      });
      numberMaps.push(map);
    };

    getDigitsUpTOLastSequence();

    // get previous numbers
    // e.g. for 3,000, get 1-999 x 2
    const getPreviousNums = () => {
      const map = getNumberMap(power - 1);
      map.forEach((v, k) => map.set(k, v * d));
      numberMaps.push(map);
    };

    getPreviousNums();
  }

  // add last n that is less than 999
  const lastMap = getNumberMap_UnderOneThousand(remainder);
  numberMaps.push(lastMap);

  const finalNumberMap = new Map();
  for (const numberMap of numberMaps) {
    numberMap.forEach((v, k) => addToMap(k, v, finalNumberMap));
  }

  return finalNumberMap;
}

function addToMap(key, value, map) {
  if (map.has(key)) {
    map.set(key, map.get(key) + value);
  } else {
    map.set(key, value);
  }
}
