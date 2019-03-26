import { getCharsInNumber, getNumberMap } from "./model";
import { getWordsInNumber } from "./helperFunctions";

describe("Calculating the number of letters in a number-string", () => {
  describe("get chars in number", () => {
    const manualTestChars = n => {
      const charMap = new Map();

      const incrementMap = (map, char) => {
        const hasChar = map.get(char);
        if (hasChar) {
          map.set(char, map.get(char) + 1);
        } else {
          map.set(char, 1);
        }
      };

      for (var i = 1; i <= n; i++) {
        var words = getWordsInNumber(i);
        for (var wordSubArray of words) {
          for (var word of wordSubArray) {
            for (var j = 0; j < word.length; j++) {
              const char = word.charAt(j);
              incrementMap(charMap, char);
            }
          }
        }
      }
      return charMap;
    };

    const manualTestWordsInNumber = n => {
      const wordMap = new Map();

      const incrementMap = (map, word) => {
        const hasWord = map.get(word);
        if (hasWord) {
          map.set(word, map.get(word) + 1);
        } else {
          map.set(word, 1);
        }
      };

      for (var i = 1; i <= n; i++) {
        var wordArray = getWordsInNumber(i);
        for (const words of wordArray) {
          for (const word of words) {
            incrementMap(wordMap, word);
          }
        }
      }
      return wordMap;
    };

    it("works for n < 999", () => {
      const check = n => {
        return compareMaps(getLetterCounts(n), manualTest(n));
      };

      for (var i = 1; i <= 999; i++) {
        const result = getCharsInNumber(i);
        const expected = manualTestChars(i);
        expect(result).toEqual(expected);
      }
    });

    it("gets correct number of thousands for n > 1,000", () => {
      const check = i => {
        const expected = manualTestWordsInNumber(i).get("thousand"); // 1010
        const result = getNumberMap(i).get("thousand");
        expect(result).toEqual(expected);
      };

      const numToCheck = [1000, 1001, 2000, 2001, 2099, 2090, 2900, 2519, 2999];
      numToCheck.forEach(n => check(n));
    });

    it("works for 1000 - 1999", () => {
      const check = i => {
        const expected = manualTestWordsInNumber(i);
        const result = getNumberMap(i);
        expect(result).toEqual(expected);
      };

      // const numToCheck = [1000, 1001, 1003, 2000, 2001, 2099, 2090, 2900, 2519, 2999];
      for (var i = 1000; i < 2000; i++) {
        check(i);
      }
    });

    it("works for 2,000-9,999", () => {
      const check = i => {
        const expected = manualTestWordsInNumber(i);
        const result = getNumberMap(i);
        expect(result).toEqual(expected);
      };

      check(2000);
      check(3001);
      check(9999);
    });

    it("works for 10,000-999,999 ", () => {
      const check = i => {
        const expected = manualTestWordsInNumber(i);
        const result = getNumberMap(i);
        expect(result).toEqual(expected);
      };

      check(10000);
      check(11001);
      check(21021);
      check(100000);
      check(999999);
    });

    it("works for 1,000,000 ", () => {
      const check = i => {
        const expected = manualTestWordsInNumber(i);
        const result = getNumberMap(i);
        expect(result).toEqual(expected);
      };

      //check(1000000, 1000001);
    });
  });
});
