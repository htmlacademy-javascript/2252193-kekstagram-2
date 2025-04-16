// функция для рандомного числа из диапазона.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  // Исключаем повторение значения в след вызовах для коментариев
  return result === upper ? lower : result + 1; // подставляем следующий
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const numPlural = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const getTemplateElement = (parent, templateId, elementClass) => parent.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const randomIntegersBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return shuffleArray(values).splice(0, resultsCount);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, isEscapeKey, numPlural, getTemplateElement, randomIntegersBetweenRange, debounce };
