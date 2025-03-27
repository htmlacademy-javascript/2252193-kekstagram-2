import {getRandomInteger} from './util.js';
import {MAX_COMMENTS, MAX_LIKES, MESSAGES, MIN_COMMENTS, MIN_LIKES, NAMES, OBJ_NUMBER} from './data.js';

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

export {getPhotoArray, createPhoto};
