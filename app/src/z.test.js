import { handle, convert, splitIntoThrees, makeDataObjects } from "./model2";

describe("js", () => {
  it("", () => {});

  describe(" ", () => {
    // it.only("r ", () => {
    //   for (var i = 1; i <= 999; i++) {
    //     var a = [];
    //     var n = [];
    //     convert(i, n);
    //     handle(n, a, "hundred");
    //     console.log(i, a.join(" "));
    //   }
    // });

    //1083 'onethousandeighthundredthree'

    it("100, 101", () => {
      var a = [];
      var n = [];
      convert(100, n);
      handle(n, a);
      console.log(100, a.join(" "));

      var a = [];
      var n = [];
      convert(101, n);
      handle(n, a);
      console.log(100, a.join(" "));
    });

    const manualTest = n => {
      var totalChars = 0;
      // 879
      for (var i = 1; i <= n; i++) {
        const d = makeDataObjects(i);
        totalChars += d.charMap.size;
      }
      return totalChars;
    };

    it.only("", () => {
      console.log(manualTest(123));
    });

    it("threes", () => {
      t = splitIntoThrees([1, 2, 3]);
      expect(t).toEqual([[1, 2, 3]]);

      var t = splitIntoThrees([2, 4, 5, 6]);
      expect(t).toEqual([[2], [4, 5, 6]]);

      var t = splitIntoThrees([1, 2, 4, 5, 6]);
      expect(t).toEqual([[1, 2], [4, 5, 6]]);

      t = splitIntoThrees([1, 2, 3, 4, 5, 6]);
      expect(t).toEqual([[1, 2, 3], [4, 5, 6]]);
    });
  });
});
