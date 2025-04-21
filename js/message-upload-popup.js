import { isEscapeKey, getTemplateElement } from './util.js';
import { ALERT_SHOW_TIME } from './data.js';

const pageBody = document.body;
const errorUploadTemplate = getTemplateElement(pageBody, 'error', 'error');
const successUploadTemplate = getTemplateElement(pageBody, 'success', 'success');
const templateError = document.querySelector('#data-error').content.querySelector('.data-error');

const openUploadMessagePopup = (popupType) => {

  let popupTemplate;
  let popupInnerSection;
  let popupButtonElementClass;

  switch (popupType) {
    case 'success':
      popupTemplate = successUploadTemplate;
      popupInnerSection = '.success__inner';
      popupButtonElementClass = '.success__button';
      break;
    case 'error':
      popupTemplate = errorUploadTemplate;
      popupInnerSection = '.error__inner';
      popupButtonElementClass = '.error__button';
      break;
  }

  const innerPopup = popupTemplate.cloneNode(true);
  const innerPopupSection = innerPopup.querySelector(popupInnerSection);
  const popupButton = innerPopup.querySelector(popupButtonElementClass);

  const onUploadMessagePopupEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUploadMessagePopup();
    }
  };

  const onOutsideClick = (evt) => {
    const isOutsideClick = !evt.composedPath().includes(innerPopupSection);
    if (isOutsideClick) {
      closeUploadMessagePopup();
    }
  };

  function closeUploadMessagePopup() {
    popupButton.removeEventListener('click', closeUploadMessagePopup);
    document.removeEventListener('keydown', onUploadMessagePopupEsc);
    document.removeEventListener('click', onOutsideClick);
    innerPopup.remove();
  }

  document.addEventListener('keydown', onUploadMessagePopupEsc);
  document.addEventListener('click', onOutsideClick);

  popupButton.addEventListener('click', closeUploadMessagePopup);

  pageBody.appendChild(innerPopup);
};

const shownToastError = (errorMessage) => {
  const errorElement = templateError.cloneNode(true);
  document.body.appendChild(errorElement);
  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  setTimeout(() => (errorElement.remove()), ALERT_SHOW_TIME);
};

export { openUploadMessagePopup, shownToastError };

