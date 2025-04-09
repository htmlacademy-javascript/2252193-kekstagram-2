import {MAX_SYMBOLS, MAX_HASHTAGS} from './data.js';
import {errorText} from './const-errors.js';

const uploadForm = document.querySelector('.img-upload__form');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

let errorMsg = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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
      error: errorText.startsWithHash,
    },
    {
      check: hashtagArray.some((item) => item === '#'),
      error: errorText.notOnlyHash,
    },
    {
      check: hashtagArray.some((item) => item.length > MAX_SYMBOLS),
      error: errorText.maxLengthSymbols,
    },
    {
      check: hashtagArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: errorText.invalidSymbols,
    },
    {
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: errorText.notSeparated,
    },
    {
      check: hashtagArray.some((item, num, array) => array.includes(item, num + 1)),
      error: errorText.notRepeated,
    },
    {
      check: hashtagArray.length > MAX_HASHTAGS,
      error: errorText.maxLengthHashtags,
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

const formValidate = () => {
  pristine.addValidator(hashtagInput, isHashtagsValid, error);
  pristine.addValidator(textInput, (value) => value.length <= 140, 'Слишком длинный комментарий');
  uploadForm.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('input', onInputHashtag);
};

export {formValidate};
