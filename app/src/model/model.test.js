import { getLetterCount } from "./model";
import { getWordsInNumber } from "./helperFunctions";

describe("Calculating the number of letters in a number-string", () => {
  describe("getLetterCount", () => {
    
    const manualTest = (n) => {
       const incrementMap = (map, char) => {
          const hasChar = map.get(char);
          if (hasChar) {
            map.set(char, map.get(char) + 1);
          } else {
            map.set(char, 1);
          }
        };

        for (var i = 1; i <= n; i++) {
          var words = getWordsInNumber(i).nArray;
          for (var wordSubArray of wordSubArray) {
            for (var word of wordArray) {
              for (var j = 0; j < word.length; j++) {
                const char = word.charAt(j);
                increment(charMap, char);
              }
            }
          }
        }
        return charMap;
      }
    }
    
    manualCheck(n) {
      
    }
  });
});
