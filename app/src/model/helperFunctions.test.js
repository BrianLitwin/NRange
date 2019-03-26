import { makeNumberArray } from "./helperFunctions";

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
  
  it("converts number arrays into string arrays", () => {
    expect(makeNumberArray(1)).toBe(["one"])
    expect(makeNumberArray(15)).toBe(["fifteen")])
    expect(makeNumberArray(72)).toBe(["seventy", "two"])
    expect(makeNumberArray(123)).toBe(["one", "hundred", "twenty", "three"])
    expect(makeNumberArray(123456)).toBe(["one", "hundred", "twenty", "three", "thousand", "four", "hundred", "fifty", "six"])
    
  })

});
