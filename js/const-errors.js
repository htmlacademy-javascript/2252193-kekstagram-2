import { MAX_HASHTAGS, MAX_SYMBOLS } from './data.js';
import { getPluralNum } from './util.js';

const errorText = {
  startsWithHash: 'Хэштег начинается с символа # (решётка)',
  notOnlyHash: 'Хэштег не может состоять только из одной решетки',
  maxLengthSymbols: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
  invalidSymbols: 'Хэштег содержит недопустимые символы',
  notSeparated: 'Хэштеги разделяются пробелами',
  notRepeated: 'Хэштеги не должны повторяться',
  maxLengthHashtags: `Нельзя указать больше ${MAX_HASHTAGS} ${getPluralNum(
    MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
  )}`,
};

const submitBtnText = {
  success: 'Публикация...',
  default: 'Опубликовать',
};

export { errorText, submitBtnText };
