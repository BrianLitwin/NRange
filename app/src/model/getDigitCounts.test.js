import {
  getSingleDigits,
  getTeens,
  getMultiplesOfTen,
  getHundreds
} from "./getDigitCounts";

// Could loop over a test range in these test cases
// but loopoing in model.test

describe("getting the digit count in a sequence of numbers", () => {
  it("gets the count of single digits", () => {
    expect(getSingleDigits(1, 1)).toBe(1);
    expect(getSingleDigits(1, 2)).toBe(0);
    expect(getSingleDigits(9, 5)).toBe(1);
    expect(getSingleDigits(10, 1)).toBe(1);
    expect(getSingleDigits(19, 9)).toBe(1);
    expect(getSingleDigits(29, 2)).toBe(2);
    expect(getSingleDigits(99, 1)).toBe(9);
    expect(getSingleDigits(100, 1)).toBe(10);
    expect(getSingleDigits(101, 1)).toBe(12);
    expect(getSingleDigits(123, 3)).toBe(11);
    expect(getSingleDigits(123, 4)).toBe(10);
    expect(getSingleDigits(999, 9)).toBe(190);
  });

  it("gets the count of tens", () => {
    expect(getTeens(18, 19)).toBe(0);
    expect(getTeens(20, 19)).toBe(1);
    expect(getTeens(211, 10)).toBe(3);
  });

  it("get the count of multiples of ten", () => {
    expect(getMultiplesOfTen(20, 20)).toBe(1);
    expect(getMultiplesOfTen(30, 20)).toBe(10);
    expect(getMultiplesOfTen(155, 50)).toBe(16);
    expect(getMultiplesOfTen(999, 90)).toBe(100);
  });

  it("gets the count of hundreds", () => {
    expect(getHundreds(100)).toBe(1);
    expect(getHundreds(999)).toBe(900);
  });
});
