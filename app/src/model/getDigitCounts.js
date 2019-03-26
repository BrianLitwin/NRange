/*
  Looking for the recurrence of a certain digit(s) in a sequence of numbers
  e.g. from 1 to 45, the number 3 occurs at: 3 and 23, 33, and 43

  Notation: The param n is the end of the sequence, and occ
  is the digit(s) to look for.
  E.g. n = 15, occ = 2 => looking for the recurrence of 2 in the seq
  from 1 to 15
*/

function _getHundreds(n) {
  return Math.floor(n / 100);
}

function _getTens(n) {
  return Math.floor((n - _getHundreds(n) * 100) / 10);
}

function _getSingleDigits(n) {
  return n - (_getTens(n) * 10 + _getHundreds(n) * 100);
}

// looking for occ in n
export function getSingleDigits(n, occ) {
  var count = 0;
  const hundreds = _getHundreds(n);
  const tens = _getTens(n);
  const singleDigits = _getSingleDigits(n);

  if (hundreds > 0) {
    count += hundreds * 9; // will pass n 9 times for each hundred
  }

  if (hundreds > occ) {
    count += 100; // will go from n hundred to n hundredNinetyNine
  }

  // eg n = 9, comp n = 951 => ninehundred x 51
  if (hundreds === occ) {
    count += tens * 10 + singleDigits + 1;
  }

  // have to skip the teens
  if (tens === 1) {
    count += 1;
    return count;
  } else if (tens > 1) {
    count += tens - 1;
  }

  count += singleDigits >= occ ? 1 : 0;
  return count;
}

export function getTeens(n, occ) {
  var count = _getHundreds(n);
  const tens = _getTens(n);
  const singleDigits = _getSingleDigits(n);

  if (tens > 1) {
    count += 1;
  }

  if (tens === 1) {
    if (10 + singleDigits >= occ) {
      count += 1;
    }
  }
  return count;
}

export function getMultiplesOfTen(n, occ) {
  const hundreds = _getHundreds(n);
  const tens = _getTens(n);
  const singleDigits = _getSingleDigits(n);

  var count = hundreds * 10;
  if (10 * tens > occ) {
    count += 10;
  } else if (10 * tens === occ) {
    count += singleDigits + 1;
  }
  return count;
}

export function getHundreds(n) {
  const hundreds = _getHundreds(n);
  const tens = _getTens(n);
  const singleDigits = _getSingleDigits(n);

  if (hundreds < 1) {
    return 0;
  }
  return 1 + hundreds * 100 + tens * 10 + singleDigits - 100;
}
