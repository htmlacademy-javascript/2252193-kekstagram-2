const isEscapeKey = (evt) => evt.key === 'Escape';

const getPluralNum = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const getTemplateElement = (parent, templateId, elementClass) => parent.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);

const getRandomNumber = (array) => [...array].sort(() => Math.random() - 0.5);

const getRandomIntegersBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return getRandomNumber(values).splice(0, resultsCount);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, getPluralNum, getTemplateElement, getRandomIntegersBetweenRange, debounce };
