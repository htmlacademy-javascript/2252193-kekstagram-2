import { isEscapeKey, getTemplateElement } from './util.js';
import {ALERT_SHOW_TIME} from './data.js';

const pageBody = document.body;
const errorUploadTemplate = getTemplateElement(pageBody, 'error', 'error');
const successUploadTemplate = getTemplateElement(pageBody, 'success', 'success');

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


const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {openUploadMessagePopup, showAlertMessage};
