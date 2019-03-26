import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./stringDataArrays";

const countSingleDigits = countRange(singleDigits);
const countTenToNineteen = countRange(tenToNineteen);

/*
  the word thousand will be in every word over one thousand
  the word hundred will be in
*/

function numOfThousands(n) {
  if (n < 1000) {
    return 0;
  } else if (n < 1000000) {
    return n - 1000;
  } else {
  }
}

export function charCount(n) {
  if (n <= 999) {
    return charCount_upToThreeDigits(n);
  } else {
    const digitCount = n.toString().length;
    const w = Math.pow(10, digitCount - 1); // e.g. 999 => 100, 9999 => 1000
    console.log("w: " + w);
    const d = Math.floor(n / w); // e.g. 999 => 9, 9999 => 9
    console.log("d: " + d);
    const r = n % w; // e.g. 999 => 99, 9999 => 999
    console.log("r: " + r);

    "thousand".length * (d - 1) * w + r;

    return count;
  }
}

/*
get the top string used e.g. "thousand"
then ask: how many "thousand"s in 150,000


*/

// export function charCount(n) {
//   if (n < 100) {
//     return charCount_upToNinetyNine(n);
//   }
//   const digitCount = n.toString().length;
//   const w = Math.pow(10, digitCount - 1); // e.g. 999 => 100, 1000 => 1000
//   console.log("w: " + w);
//   const d = Math.floor(n / w); // e.g. 999 => 9, 1000 => 1
//   console.log("d: " + d);
//   const r = n % w; // e.g. 999 => 99, 1000 => 0
//   console.log("r: " + r);
//
//   var tenStrLen;
//   if (w === 100) {
//     tenStrLen = "hundred".length;
//   } else {
//     const facThree = Math.floor(digitCount / 3);
//     tenStrLen = tensPower[facThree - 1].length;
//     console.log(tenStrLen);
//   }
//
//   var final = 0;
//
//   for (var i = 0; i < d; i++) {
//     const sDigit = singleDigits[i].length; // e.g. => "one, two, three... "
//     const c = sDigit + tenStrLen; // e.g. "one thousand, "two thousand"
//     var x = c * w; // e.g. "one thousand" * 1000
//     x += charCount(w - 1); // e.g. "charCount(999)"
//     final += x;
//   }
//
//   final += charCount(r);
//   return final;
// }

function charCount_upToThreeDigits(n) {
  if (n < 100) {
    return charCount_upToNinetyNine(n);
  }
  const d = Math.floor(n / 100);
  const r = n % 100;
  const upTo99 = charCount_upToNinetyNine(99);
  var charCount = upTo99;
  charCount += charCount_upToNinetyNine(r);

  // "hundred".length = 7

  charCount += (7 + singleDigits[d - 1].length) * (r + 1);
  for (var i = 0; i < d - 1; i++) {
    charCount += upTo99;
    charCount += (7 + singleDigits[i].length) * 100;
  }
  return charCount;
}

function charCount_upToNinetyNine(n) {
  if (n < 20) {
    return charCount_upToNineteen(n);
  } else {
    const d = Math.floor(n / 10);
    const r = n % 10;
    var charCount = countSingleDigits + countTenToNineteen;
    charCount += charCount_upToNineteen(r); // eg. 26 => 1 to 6 here, add "twenty" below
    charCount += tensMultiple[d - 2].length * (r + 1);

    for (var i = 0; i < d - 2; i++) {
      charCount += countSingleDigits;
      charCount += tensMultiple[i].length * 10;
    }
    return charCount;
  }
}

function charCount_upToNineteen(n) {
  var charCount = 0;
  for (var i = 1; i <= n; i++) {
    if (i < 10) {
      charCount += singleDigits[i - 1].length;
    } else if (i < 20) {
      charCount += tenToNineteen[i - 10].length;
    } else {
      throw new Error(`n must be less than 20: ${n}`);
    }
  }
  return charCount;
}

export function makeArray(n, arr) {
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

// eg. convert [1,2,3,4,5,6,7] into [[1],[2,3,4],[5,6,7]]
export function splitArrayIntoThrees(arr) {
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

  return final;
}

/*
  returns a range from the given array.
  e.g. makeRange(2, 5, [1,2,3,4,5,6,7]) returns [3,4,5]
*/
function makeRange(start, end, arr) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(arr[i]);
  }
  return ans;
}

function countRange(arr) {
  return arr.reduce((c, n) => c + n.length, 0);
}
