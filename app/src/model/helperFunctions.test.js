import { makeNumberArray, formatArray } from "./helperFunctions";

describe("helper functions", () => {
  it("converts numbers into arrays", () => {
    expect(makeNumberArray(1)).toEqual([1]);
    expect(makeNumberArray(10)).toEqual([1, 0]);
    expect(makeNumberArray(299)).toEqual([2, 9, 9]);
    expect(makeNumberArray(1234)).toEqual([1, 2, 3, 4]);
    expect(makeNumberArray(12345)).toEqual([1, 2, 3, 4, 5]);
    expect(makeNumberArray(123456)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(makeNumberArray(1234567)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(makeNumberArray(14234567)).toEqual([1, 4, 2, 3, 4, 5, 6, 7]);
  });
  
  it("converts numbers into three digit arrays", () => {
    expect(formatNumberArraytoThreeDigits([1])).toEqual([[1][);
    expect(formatNumberArraytoThreeDigits([10])).toEqual([[1, 0][);
    expect(formatNumberArraytoThreeDigits([2,9,9])).toEqual([[2, 9, 9][);
    expect(formatNumberArraytoThreeDigits([1],[2,3,4])).toEqual([[1],[2, 3, 4]]);
    expect(formatNumberArraytoThreeDigits([1,2], [3,4,5])).toEqual([[1, 2], [3, 4, 5]]);
    expect(formatNumberArraytoThreeDigits([[1,2,3], [4,5,6]])).toEqual([[1, 2, 3], [4, 5, 6]]);
    expect(formatNumberArraytoThreeDigits([[1],[2,3,4],[5,6,7]])).toEqual([[1], [2, 3, 4], [5, 6, 7]]);
    expect(formatNumberArraytoThreeDigits([[1,4],[2,3,4],[5,6,7]])).toEqual([[1, 4], [2, 3, 4], [5, 6, 7]]);
  })
  
  it("converts number arrays into string arrays for n < 1000", () => {
    expect(formatArray(1)).toBe(["one"])
    expect(formatArray(15)).toBe(["fifteen")])
    expect(formatArray(72)).toBe(["seventy", "two"])
    expect(formatArray(123)).toBe(["one", "hundred", "twenty", "three"])
  })
  
  it("converts number arrays into string arrays for n > 1000", () => {
    expect(getWordsInNumber(1000)).toBe(["one", "thousand"]), 
    expect(getWordsInNumber(1001)).toBe(["one", "thousand", "one"]), 
    expect(getWordsInNumber(2234)).toBe(["two", "thousand", "two", "hundred", "twenty", "three"]), 
    expect(getWordsInNumber(10015)).toBe(["ten", "thousand", "fifteen"]) 
    expect(getWordsInNumber(999554)).toBe("nine", "hundred", "ninety", "nine", "thousand", "five", "hundred", "fity", "four"]
    expect(getWordsInNumber(1000000)).toBe(["one", "million"])                                               
    expect(getWordsInNumber(1303001)).toBe(["one", "million", "three", "hundred", "three", "thousand", "one"])
    expect(getWordsInNumber(100802200)).toBe(["ten", "million", "eighty", "thousand", "two", "hundred", "twenty"])
  })

});
