function getLetterCount(n, letterMap = new Map(), multiplier = 1) {
  if (n <= 999) {
    console.log(n);
    return;
    // get the count of letters under 999
  }

  const numberArray = makeNumberArray(n); // e.g. [[12], [456], [789]]
  const firstHundred = numberArray.shift();
  const last = numberArray.pop();

  getLetterCount(firstHundred, letterMap);
  const lastPwr = Math.pow(10, (numberArray.length + 1) * 3);
  console.log(lastPwr);
  getLetterCount(last, charMap, lastPwr);
  // first will be 'hundreds' e.g. calling charCountIn will
  // comprehensive
  // the others require adding 'thousand', 'million', etc,
  // to each letter count
  // e.g. 12,456 will count 1-12 + 'thousand' x 1000
  // for each

  for (var i = 0; i < numberArray.length; i++) {
    const power = 3 * (i + 1);
    const powerOfTen = Math.pow(19, power);
    const letterCountMap = getLetterCount(numberArray[i], letterMap);

    remainder = makeNines(3 * (i + 1)); // eg 999, 999999, etc
    multiplier = powerOfTen;
    getLetterCount(remainder, letterMap, multiplier);
  }

  return charMap;
}
