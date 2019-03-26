import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./stringDataArrays";

function countRange(arr) {
  return arr.reduce((c, n) => c + n.length, 0);
}

const countSingleDigits = singleDigits.reduce((c, n) => c + n.length, 0);
const countTenToNineteen = tenToNineteen.reduce((c, n) => c + n.length, 0);
const countTensMutliple = countRange(tensMultiple);
const countTensPower = countRange(tensPower);

export const singleDigitsDataObjects = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x =>
  makeDataObjects(x)
);

export const tenToNineteenDataObjects = [
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
].map(x => makeDataObjects(x));

export const tensMultipleDataObjects = [20, 30, 40, 50, 60, 70, 80, 90].map(x =>
  makeDataObjects(x)
);

// export const tensPowerDataObjects = tensPower.map(x => makeDataObjects(x));

export function countChars(chars, charMap = new Map(), multiplier = 1) {
  const increment = (charMap, char) => {
    const charCount = charMap.get(char);
    if (charCount) {
      charMap.set(char, charCount + multiplier);
    } else {
      charMap.set(char, multiplier);
    }
  };
  [...chars].forEach(char => increment(charMap, char));
  return charMap;
}

function makeRange(start, end, arr) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(arr[i]);
  }
  return ans;
}

export function convert(n, arr) {
  if (n < 10) {
    arr.unshift(n);
    return arr;
  } else {
    const d = Math.floor(n / 10);
    const r = n % 10;
    arr.unshift(r);
    convert(d, arr);
  }
}

// handle 0
// handle input that starts with 0

export function makeDataObjects(n) {
  const temp = [];
  convert(n, temp);
  const array = splitIntoThrees(temp);

  const charSegments = [];

  while (array.length > 0) {
    const next = array.shift();
    const strArr = [];
    handle(next, strArr);

    if (array.length > 0) {
      strArr.push(tensPower[array.length - 1]);
    }

    charSegments.push(strArr);
  }

  const string = charSegments.map(seg => seg.join("")).join("");
  const charMap = countChars(string);

  return { n, string, charMap, nArray: charSegments };
}

export function handle(numArr, strArr) {
  const len = numArr.length;

  if (numArr[0] === 0) {
    numArr.shift();
    return handle(numArr, strArr);
  }

  if (len === 0) {
    return;
  }

  if (len === 2) {
    // less than 10 e.g. [0,1]
    if (numArr[0] === 0 && numArr[1] != 0) {
      strArr.push(numArr[1]);
      numArr = [];

      // between 10 and 19
    } else if (numArr[0] === 1) {
      strArr.push(tenToNineteen[numArr[1]]);
      numArr = [];
    } else {
      // between 20 and 99
      strArr.push(tensMultiple[numArr[0] - 2]);
      numArr.shift();
      handle(numArr, strArr);
    }
  } else if (len === 1) {
    if (numArr[0] != 0) {
      strArr.push(singleDigits[numArr.shift() - 1]);
    }
  } else {
    // three digits >= 100
    const firstD = numArr[0];
    const firstDigit = singleDigits[numArr[0] - 1];
    //strArr.push(`${firstDigit}hundred`);
    strArr.push(firstDigit);
    strArr.push("hundred");
    numArr.shift();
    handle(numArr, strArr);
  }
}

const m = new Map();

export function splitIntoThrees(arr) {
  var i = arr.length % 3;
  if (i === 0) {
    i = 2;
  }

  // e.g. [[1,2,3], [4,5,6], [7,8,9]]
  var groupsOfThree = [];
  var final = [];

  while (arr.length > 0) {
    groupsOfThree.push(arr.shift());

    if (arr.length % 3 === 0) {
      final.push(groupsOfThree);
      groupsOfThree = [];
      i = 3;
    }
  }

  if (groupsOfThree.length > 0) {
    final.push(groupsOfThree);
  }

  // for testing
  return final;
}
