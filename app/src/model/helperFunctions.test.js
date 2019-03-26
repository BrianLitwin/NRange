import {
  makeNumberArray,
  formatArray,
  formatNumberArraytoThreeDigits,
  getWordsInNumber,
  getActiveNumbers,
  joinMaps
} from "./helperFunctions";

import {
  singleDigits,
  tenToNineteen,
  tensMultiple,
  tensPower
} from "./numbers";

describe("helper functions", () => {
  it("converts numbers into arrays", () => {
    expect(makeNumberArray(1)).toEqual([1]);
    expect(makeNumberArray(10)).toEqual([1, 0]);
    expect(makeNumberArray(100)).toEqual([1, 0, 0]);
    expect(makeNumberArray(299)).toEqual([2, 9, 9]);
    expect(makeNumberArray(1000)).toEqual([1, 0, 0, 0]);
    expect(makeNumberArray(1234)).toEqual([1, 2, 3, 4]);
    expect(makeNumberArray(12345)).toEqual([1, 2, 3, 4, 5]);
    expect(makeNumberArray(123456)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(makeNumberArray(1234567)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(makeNumberArray(14234567)).toEqual([1, 4, 2, 3, 4, 5, 6, 7]);
  });

  it("converts numbers into three digit arrays", () => {
    expect(formatNumberArraytoThreeDigits([1])).toEqual([[1]]);
    expect(formatNumberArraytoThreeDigits([1, 0])).toEqual([[1, 0]]);
    expect(formatNumberArraytoThreeDigits([1, 0, 0])).toEqual([[1, 0, 0]]);
    expect(formatNumberArraytoThreeDigits([1, 0, 0, 0])).toEqual([
      [1],
      [0, 0, 0]
    ]);
    expect(formatNumberArraytoThreeDigits([2, 9, 9])).toEqual([[2, 9, 9]]);
    expect(formatNumberArraytoThreeDigits([1, 2, 3, 4])).toEqual([
      [1],
      [2, 3, 4]
    ]);
    expect(formatNumberArraytoThreeDigits([1, 2, 3, 4, 5])).toEqual([
      [1, 2],
      [3, 4, 5]
    ]);
    expect(formatNumberArraytoThreeDigits([1, 2, 3, 4, 5, 6])).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    expect(formatNumberArraytoThreeDigits([1, 2, 3, 4, 5, 6, 7])).toEqual([
      [1],
      [2, 3, 4],
      [5, 6, 7]
    ]);
    expect(formatNumberArraytoThreeDigits([1, 4, 2, 3, 4, 5, 6, 7])).toEqual([
      [1, 4],
      [2, 3, 4],
      [5, 6, 7]
    ]);
  });

  it("converts number arrays into string arrays for n < 1000", () => {
    expect(formatArray([1])).toEqual(["one"]);
    expect(formatArray([0, 1])).toEqual(["one"]);
    expect(formatArray([1, 0])).toEqual(["ten"]);
    expect(formatArray([1, 5])).toEqual(["fifteen"]);
    expect(formatArray([7, 2])).toEqual(["seventy", "two"]);
    expect(formatArray([0, 1, 0])).toEqual(["ten"]);
    expect(formatArray([0, 0, 0])).toEqual([]);
    expect(formatArray([1, 0, 0])).toEqual(["one", "hundred"]);
    expect(formatArray([1, 0, 1])).toEqual(["one", "hundred", "one"]);
    expect(formatArray([1, 2, 3])).toEqual([
      "one",
      "hundred",
      "twenty",
      "three"
    ]);
  });

  it("converts number arrays into string arrays for n > 1000", () => {
    expect(getWordsInNumber(1000)).toEqual([["one", "thousand"]]);
    expect(getWordsInNumber(1001)).toEqual([["one", "thousand"], ["one"]]),
      expect(getWordsInNumber(2234)).toEqual([
        ["two", "thousand"],
        ["two", "hundred", "thirty", "four"]
      ]);
    expect(getWordsInNumber(10015)).toEqual([["ten", "thousand"], ["fifteen"]]);
    expect(getWordsInNumber(999554)).toEqual([
      ["nine", "hundred", "ninety", "nine", "thousand"],
      ["five", "hundred", "fifty", "four"]
    ]);
    expect(getWordsInNumber(1000000)).toEqual([["one", "million"]]);
    expect(getWordsInNumber(1303001)).toEqual([
      ["one", "million"],
      ["three", "hundred", "three", "thousand"],
      ["one"]
    ]);
    expect(getWordsInNumber(1000802220)).toEqual([
      ["one", "billion"],
      ["eight", "hundred", "two", "thousand"],
      ["two", "hundred", "twenty"]
    ]);
  });

  it("gets list of string representations of numbers", () => {
    expect(getActiveNumbers(1)).toEqual([[{ n: 1, string: "one" }]]);
    expect(getActiveNumbers(4)).toEqual([
      [
        { n: 1, string: "one" },
        { n: 2, string: "two" },
        { n: 3, string: "three" },
        { n: 4, string: "four" }
      ]
    ]);

    var objects = getActiveNumbers(11);
    expect(objects.length).toBe(2);
    expect(objects[0][objects[0].length - 1]).toEqual({ n: 9, string: "nine" });
    expect(objects[1]).toEqual([
      { n: 10, string: "ten" },
      { n: 11, string: "eleven" }
    ]);

    objects = getActiveNumbers(93);
    expect(objects.length).toBe(3);
    expect(objects[2][objects[2].length - 1]).toEqual({
      n: 90,
      string: "ninety"
    });

    objects = getActiveNumbers(999222444);
    expect(objects.length).toBe(5);
    expect(objects[3]).toEqual([{ n: 100, string: "hundred" }]);
    expect(objects[4]).toEqual([
      { string: "thousand", n: 1000 },
      { string: "million", n: 1000000 }
    ]);
  });
});
