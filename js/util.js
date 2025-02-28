//импорт констант data.js
import {NAMES, MESSAGES, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, OBJ_NUMBER} from './data.js';

// функция для рандомного числа из диапазона.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  // Исключаем повторение значения в след вызовах для коментариев
  return result === upper ? lower : result + 1; // подставляем следующий
};

const makeMessage = (count) => {
  const messageSet = new Set();
  while (messageSet.size < count) {
    messageSet.add(MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]);
  }
  return Array.from(messageSet).join(' ');
};

// Создаем вложеный объект для Comments
const createComment = (_, index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: makeMessage(getRandomInteger(1,2)),
  name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`,
});

const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: `Это фотография №${index + 1}`,
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  // Список коментариев
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment),
});

// массив описаний фото
const getPhotoArray = () => Array.from({length: OBJ_NUMBER}, createPhoto);
console.log(getPhotoArray());

