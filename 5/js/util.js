// Результат: целое число из диапазона "от...до"
const getRandomInt = (first, last) => {
  if (first >= last) {
    throw new Error('First cannot be greater than last.');
  }

  if (first < 0 || last < 0) {
    throw new Error('The range cannot be negative.');
  }

  first = Math.ceil(first);
  last = Math.floor(last);

  return Math.floor(Math.random() * (last + 1 - first) + first);
};

// Результат: true, если строка проходит по длине, и false — если не проходит
const checkLength = (str, maxLen) => str.length <= maxLen;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getFreeId = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      array[i] = true;
      return i + 1;
    }
  }
};
export {getRandomInt, checkLength, getRandomArrayElement, getFreeId};
