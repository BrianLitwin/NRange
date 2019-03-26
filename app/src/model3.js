import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./stringDataArrays";

export function newModel() {
  return {
    start: 0,
    end: 1,
    letter: "e",
    startString: "one",
    endString: "onehundredtwentythree",
    length: 782,
    probOfLetter: 7.81
  };
}
//
// export function charsInNumber(start, end) {
//   characterCountInNum(end);
//
//   var nestedArrays = [];
//   if (end > 10) {
//     nestedArrays.push(singleDigits);
//   }
//   if (end > 19) {
//     nestedArrays.push(tenToNineteen);
//   }
//   if (end > 100) {
//     nestedArrays.push(tensMultiple);
//   }
//
//   const retSet = new Set();
//
//   for (const array of nestedArrays) {
//     for (const letter of array) {
//       for (const character of letter) retSet.add(character);
//     }
//   }
//
//   return retSet;
// }
