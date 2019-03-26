import {
  handle,
  splitIntoThrees,
  makeDataObjects,
  countCharsInString
} from "./model2";

describe("counting chars", () => {
  const manualTest = n => {
    var totalChars = 0;
    // 879
    for (var i = 1; i <= n; i++) {
      const d = makeDataObjects(i);
      totalChars += d.string.length;
    }
    return totalChars;
  };

  const expectEqual = n => {
    expect(countCharsInString(n)).toBe(manualTest(n));
  };

  it("1 to 19", () => {
    for (var i = 1; i <= 19; i++) {
      expectEqual(i);
    }
  });

  it("20 to 99", () => {
    for (var i = 1; i <= 99; i++) {
      expectEqual(i);
    }
  });

  it.only("100", () => {
    expect(countCharsInString(123)).toBe(manualTest(123));
  });
});
