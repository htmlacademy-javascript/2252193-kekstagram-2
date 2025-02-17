// Массив имен
const NAMES = ['Иван', 'Никита', 'Максим', 'Леонид', 'Кирил', 'Алексей', 'Денис', 'Настя', 'Марина', 'Ника', 'Даша', 'Майя', 'Эля', 'Диана'];

// Массив сообщений
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// количество лайков
const MIN_LIKES = 15;
const MAX_LIKES = 200;

// количество коментов
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

//число обьектов
const OBJ_NUMBER = 25;

// функция для рандомного числа из диапазона.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let lastResult = -1;
  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    // Исключаем повторение значения в след вызовах для коментариев
    if (lastResult !== result) {
      lastResult = result;
      return result;
    }
    return result === upper ? lower : result + 1; // подставляем следующий
  };
};

// Создаем вложеный объект для Comments
const createComment = () => {
  let id = 1;
  const indexMessageArr = getRandomInteger(0, MESSAGES.length - 1);
  const indexNameArr = getRandomInteger(0, NAMES.length - 1);
  // возвращаемая функция
  return () => {
    const comment = {};
    const idAvatar = getRandomInteger(1,6);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = `${MESSAGES[indexMessageArr()]}. ${MESSAGES[indexMessageArr()]}`;
    comment.name = `${NAMES[indexNameArr()]}`;
    id++;
    return comment;
  };
};
// колво коментов
const numComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
// Колво лайков
const numLikes = getRandomInteger(MIN_LIKES, MAX_LIKES);

// функция создания обьекта
const createPhoto = () => {
  let id = 1;
  return () => {
    const photo = {};
    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = `Это фотография №${id}`;
    photo.likes = numLikes();
    // Список коментариев
    photo.comments = Array.from({length: numComments()}, createComment());
    id++;
    return photo;
  };
};

// массив описаний фото
const photoArray = Array.from({length: OBJ_NUMBER}, createPhoto());
console.log(photoArray);
