const validLetter = str => {
  return str.length === 1 && str.match(/[a-z]/i);
};

const validN = str => {
  return Number.isInteger(str);
};

const validateStartAndEndNumbers = (start, end) => {
  return start < end;
};

function validateState(start, end, letter) {
  const startIsInt = {
    valid: validN(start),
    warning: "enter a valid number"
  };
  const endIsInt = {
    valid: validN(end),
    warning: "enter a valid number"
  };
  const startLessThanEnd = {
    valid: start < end,
    warning: "enter a start number less than " + end
  };
  const letterIsValid = {
    valid: validLetter(letter),
    warning: "enter a valid letter"
  };
}
