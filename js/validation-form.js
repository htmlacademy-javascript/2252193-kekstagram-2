import { MAX_SYMBOLS, MAX_HASHTAGS, COMMENT_MAX_LENGTH } from './data.js';
import { errorText, submitBtnText } from './const-errors.js';
import { showPopup, PopupTypes } from './message-upload-popup.js';
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

const issueError = () => errorMsg;

const isHashtagsValid = (value) => {
  errorMsg = '';
  const normalizedInputHashtags = value.toLowerCase().trim().split(/\s+/);

  if (value === '') {
    pristine.reset();
    uploadSubmitButton.disabled = false;
    return true;
  }

  const Rules = [
    {
      check: normalizedInputHashtags.some((item) => item[0] !== '#'),
      error: errorText.startsWithHash,
    },
    {
      check: normalizedInputHashtags.some((item) => item === '#'),
      error: errorText.notOnlyHash,
    },
    {
      check: normalizedInputHashtags.some((item) => item.length > MAX_SYMBOLS),
      error: errorText.maxLengthSymbols,
    },
    {
      check: normalizedInputHashtags.some((item) => item.slice(1).includes('#')),
      error: errorText.notSeparated,
    },
    {
      check: normalizedInputHashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: errorText.invalidSymbols,
    },
    {
      check: normalizedInputHashtags.some((item, num, hashtagsList) => hashtagsList.includes(item, num + 1)),
      error: errorText.notRepeated,
    },
    {
      check: normalizedInputHashtags.length > MAX_HASHTAGS,
      error: errorText.maxLengthHashtags,
    },
  ];

  return Rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMsg = rule.error;
      // uploadSubmitButton.disabled = true;
    }else {
      uploadSubmitButton.disabled = false;
      return !isInvalid;
    }
  });
};

const isCommentValid = (value) => {
  const textComment = value.length <= 140;
  if (!textComment) {
    // uploadSubmitButton.disabled = true;
    errorMsg = `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`;
  } else {
    uploadSubmitButton.disabled = false;
    return textComment;
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  // const isValid = pristine.validate();
  // if (!isValid) {
  //   return;
  // }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  const onSuccess = () => {
    closePhotoEditor();
    unBlockSubmitButton();
    showPopup(PopupTypes.SUCCESS);
  };

  const onError = () => {
    unBlockSubmitButton();
    showPopup(PopupTypes.ERROR);
  };

  sendDataToServer(formData, onSuccess, onError);
};

const formValidate = () => {
  pristine.addValidator(hashtagInput, isHashtagsValid, issueError);
  pristine.addValidator(textInput, isCommentValid, issueError);
  uploadForm.addEventListener('submit', onFormSubmit);
};

export { formValidate };
