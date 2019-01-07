const NRIC = {
  LENGTH: 9,
  DIGIT_WEIGHT: [2, 7, 6, 5, 4, 3, 2],
  CHECKSUM: {
    prefixST: {
      1: 'A',
      2: 'B',
      3: 'C',
      4: 'D',
      5: 'E',
      6: 'F',
      7: 'G',
      8: 'H',
      9: 'I',
      10: 'Z',
      11: 'J'
    },
    prefixFG: {
      1: 'K',
      2: 'L',
      3: 'M',
      4: 'N',
      5: 'P',
      6: 'Q',
      7: 'R',
      8: 'T',
      9: 'U',
      10: 'W',
      11: 'X'
    }
  }
};

// Helper validator functions
/**
 * Takes in a character, returns a boolean
 *
 */
function isAlpha(myChar) {
  const matched = myChar.match(/[a-zA-Z]/);
  return matched == null ? false : true;
}

/**
 * Takes in a character, returns a boolean
 *
 *
 */
function validatePrefix(prefix) {
  let checksumPrefix;
  if (prefix === 'S' || prefix === 'T') {
    checksumPrefix = 'prefixST';
  } else if (prefix === 'F' || prefix === 'G') {
    checksumPrefix = 'prefixFG';
  } else {
    return false;
  }
  return checksumPrefix;
}

/**
 * Takes in a string and character, returns a boolean
 * Checks whether the checksum letter is one of the letters in its respective NRIC(ST or FG) group
 *
 */
function validateChecksum(checksumPrefix, inputChecksum) {
  return Object.values(NRIC.CHECKSUM[checksumPrefix]).indexOf(inputChecksum) === -1;
}

/**
 * Takes in an array of integer and character, returns the check digit
 *
 */
function calculateCheckDigit(digits, prefix) {
  const offset = (prefix === 'T' || prefix === 'G') ? 4 : 0;
  const weightedSum = digits.reduce((sum, val, idx) => sum + val * NRIC.DIGIT_WEIGHT[idx], 0);
  const remainder = (weightedSum + offset) % 11;
  return 11 - remainder;
}

/**
 * Takes in a string, returns a boolean.
 * nric is in the form: {prefix}0000000X, where prefix is either S/T/F/G, 0 represents digit,
 * X is the checksum calculated from the digits
 *
 */
function validateNRIC(nric) {
  if (nric.length !== NRIC.LENGTH) return false;

  const prefix = nric[0].toUpperCase();
  const inputChecksum = nric[nric.length - 1].toUpperCase();
  if (!isAlpha(prefix) || !isAlpha(inputChecksum)) return false;

  const checksumPrefix = validatePrefix(prefix);
  if (!checksumPrefix) return false;

  if (validateChecksum(checksumPrefix, inputChecksum)) return false;

  const digits = nric.slice(1, nric.length - 1).split('');
  digits.forEach(digit => {
    if (isNaN(digit)) return false;
  });

  const checkDigit = calculateCheckDigit(digits, prefix);
  const calculatedChecksum = NRIC.CHECKSUM[checksumPrefix][checkDigit];
  return inputChecksum === calculatedChecksum;
}

module.exports = validateNRIC;