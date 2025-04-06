import {numPlural} from './util.js';
import {MAX_SYMBOLS, MAX_HASHTAGS} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let errorMsg = '';

const error = () => errorMsg;

const isHashtagsValid = (value) => {
  errorMsg = '';
  const hashtagText = value.toLowerCase().trim();

  if (!hashtagText) {
    return true;
  }

  const hashtagArray = hashtagText.split(/\s+/);

  const rules = [
    {
      check: hashtagArray.some((item) => item[0] !== '#'),
      error: 'Хэштег начинается с символа # (решётка)',
    },
    {
      check: hashtagArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной решетки',
    },
    {
      check: hashtagArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: hashtagArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
    {
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: hashtagArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: hashtagArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numPlural(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMsg = rule.error;
    }
    return !isInvalid;
  });
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    uploadForm.submit();
  }
};

const onInputHashtag = () => {
  isHashtagsValid(hashtagInput.value);
};

pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

pristine.addValidator(textInput, (value) => value.length <= 140, 'Слишком длинный комментарий');

uploadForm.addEventListener('submit', onFormSubmit);

hashtagInput.addEventListener('input', onInputHashtag);
