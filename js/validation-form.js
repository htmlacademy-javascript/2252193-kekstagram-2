import { MAX_SYMBOLS, MAX_HASHTAGS, COMMENT_MAX_LENGTH } from './data.js';
import { errorText, submitBtnText } from './const-errors.js';
import { openUploadMessagePopup } from './message-upload-popup.js';
import { sendDataToServer } from './server-api.js';
import { closePhotoEditor } from './upload-photo-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const uploadSubmitButton = uploadForm.querySelector('#upload-submit');

let errorMsg = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = submitBtnText.success;
};

const unBlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = submitBtnText.default;
};

const error = () => errorMsg;

const isHashtagsValid = (value) => {
  errorMsg = '';
  const hashtagArray = value.toLowerCase().trim().split(/\s+/);

  if (value === '') {
    pristine.reset();
    return true;
  }

  const Rules = [
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
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: errorText.notSeparated,
    },
    {
      check: hashtagArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: errorText.invalidSymbols,
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

  return Rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMsg = rule.error;
      uploadSubmitButton.disabled = true;
    }else {
      uploadSubmitButton.disabled = false;
      return !isInvalid;
    }
  });
};

const isCommentValid = (value) => {
  const textComment = value.length <= 140;
  if (!textComment) {
    uploadSubmitButton.disabled = true;
    errorMsg = `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`;
  } else {
    uploadSubmitButton.disabled = false;
    return textComment;
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  const onSuccess = () => {
    closePhotoEditor();
    unBlockSubmitButton();
    openUploadMessagePopup('success');
  };

  const onError = () => {
    unBlockSubmitButton();
    openUploadMessagePopup('error');
  };

  sendDataToServer(formData, onSuccess, onError);
};

const formValidate = () => {
  pristine.addValidator(hashtagInput, isHashtagsValid, error);
  pristine.addValidator(textInput, isCommentValid, error);
  uploadForm.addEventListener('submit', onFormSubmit);
};

export { formValidate };
