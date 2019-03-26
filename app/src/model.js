const onehundred = initNum("onehundred", 100);

export function countChars(charMap, chars) {
  const increment = (m, char) => {
    const charCount = m.get(char);
    if (charCount) {
      m.set(char, charCount + 1);
    } else {
      m.set(char, 1);
    }
  };
  [...chars].forEach(char => increment(charMap, char));
  return charMap;
}

/*
  returns the data object associated with a number
  example:  getObject(55) returns { chars: "fiftyfive", n: 55, charMap: { f: 3, i: 2, t: 1, y: 1,v: 1, e: 1 }}
*/

export function getObject(n) {
  // joins array of data objects
  // ex [50, 5] returns 55
  function joinObjects(objects) {
    const final = { chars: "", n: 0, charMap: new Map() };
    for (const object of objects) {
      final.chars += object.chars;
      final.n += object.n;
    }
    final.charMap = countChars(new Map(), final.chars);
    return final;
  }

  function composeDoubleDigits(n) {
    const d = Math.floor(n / 10);
    const r = n % 10;
    if (r > 0) {
      return [multDigits[d - 2], singleDigits[r - 1]];
    } else {
      return [multDigits[d - 2]];
    }
  }

  var objects = [];

  if (n < 10) {
    objects = [singleDigits[n - 1]];
  } else if (n < 20) {
    objects = [teens[n - 10]];
  } else if (n < 100) {
    objects = composeDoubleDigits(n);
  } else {
    // could refactor this

    objects = [onehundred];
    const remainder = n - 100;
    if (remainder > 0) {
      //refactor !!

      if (remainder < 10) {
        objects.push(singleDigits[remainder - 1]);
      } else if (remainder < 20) {
        objects.push(teens[remainder - 10]);
      } else {
        composeDoubleDigits(remainder).forEach(o => objects.push(o));
      }
    }
  }
  return joinObjects(objects);
}

function initNum(chars, n) {
  return { chars, n };
}
