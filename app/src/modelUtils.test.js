import { splitArrayIntoThrees, charCount } from "./modelUtils";
import { makeDataObjects } from "./model2";

function get(n, i) {
  var arr = [];

  function makeArray(n) {
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

  function splitIntoThrees(arr) {
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

  var nestedArrays = splitIntoThrees(arr.slice());

  // get the number of repetitions of feach digit and multiply it by it's mt

  var dict = [
    1,
    Math.pow(10, 3),
    Math.pow(10, 6),
    Math.pow(10, 9),
    Math.pow(10, 12),
    Math.pow(10, 15)
  ];

  function getTens(n) {
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    return n - 1;
  }

  function getHundreds(n) {
    var hundreds = Math.floor(n / 100);
    var remainder = n - hundreds * 100;
    var tens = Math.floor(remainder / 10);
    var singleDigits = remainder - tens * 10;

    // e.g. 01
    if (tens === 0) {
      tens = 1;
    }

    return { hundreds, tens, singleDigits };
  }

  const format = (n, occ) => {
    console.log("format recieving:" + n, occ);
    const data = getHundreds(n);
    const hundreds = data.hundreds * 9 + 100;
    const singleDigitMatch = occ <= data.singleDigits ? 1 : 0;
    return hundreds * data.tens + data.tens + singleDigitMatch;
  };

  return format(n, i);
}

export function occurances(string, str) {
  var i = 0;
  var next = () => str.charAt(i);
  var count = 0;

  var counter = 0;

  while (counter < string.length) {
    const c = string.charAt(counter);
    counter += 1;
    if (c == next()) {
      i += 1;

      // complete
      if (i == 3) {
        count += 1;
        i = 0;
      }
    } else {
      i = 0;
    }
  }
  return count;
}

describe("modelUtils", () => {
  const makeCache = n => {
    const cache = [];

    var totalChars = 0;
    // 879
    for (var i = 1; i <= n; i++) {
      const d = makeDataObjects(i);
      totalChars += d.string.length;
      cache[i] = totalChars;
    }
    return cache;
  };

  describe("helper functions", () => {
    it("splitArrayIntoThrees", () => {
      const answer = n => {
        return splitArrayIntoThrees(n);
      };
      expect(answer([1, 2, 3])).toEqual([[1, 2, 3]]);
      expect(answer([1, 2, 3, 4])).toEqual([[1], [2, 3, 4]]);
      expect(answer([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4, 5]]);
      expect(answer([1, 2, 3, 4, 5, 6])).toEqual([[1, 2, 3], [4, 5, 6]]);
      expect(answer([1, 2, 3, 4, 5, 6, 7])).toEqual([
        [1],
        [2, 3, 4],
        [5, 6, 7]
      ]);
    });

    it("charCount_upTo", () => {
      //expect(charCount(1000000)).toBe(44872018);
      //const cache = makeCache(1000);
      var count = 0;
      for (var i = 100; i < 199; i++) {
        const d = makeDataObjects(i);
        count += occurances(d.string, "two");
        var answer = get(i, 2);
        console.log(answer, count);
      }
    });

    it("counts", () => {});
  });
});
