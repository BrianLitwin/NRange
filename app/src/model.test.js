import { getObject, countChars } from "./model";

describe("model.js", () => {
  describe("getObject", () => {
    it("returns correct number", () => {
      for (var i = 1; i <= 123; i++) {
        expect(getObject(i).n).toBe(i);
      }
    });

    it("returns correct characters", () => {
      expect(getObject(1).chars).toBe("one");
      expect(getObject(10).chars).toBe("ten");
      expect(getObject(20).chars).toBe("twenty");
      expect(getObject(21).chars).toBe("twentyone");
      expect(getObject(100).chars).toBe("onehundred");
      expect(getObject(121).chars).toBe("onehundredtwentyone");
    });
  });

  it("returns correct character map", () => {
    expect(getObject(55).charMap.get("f")).toBe(3);
    expect(getObject(55).charMap.get("i")).toBe(2);
    expect(getObject(55).charMap.size).toBe(6);
  });

  describe("miscellaneous", () => {
    var n = 0;
    var map = new Map();

    for (var i = 1; i <= 123; i++) {
      n += getObject(i).charMap.size;
      countChars(map, getObject(i).chars);
    }
    console.log(map.get("e"));
    console.log(n); //
  });
});
