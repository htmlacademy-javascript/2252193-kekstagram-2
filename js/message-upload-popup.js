import { isEscapeKey, getTemplateElement } from './util.js';
import { ALERT_SHOW_TIME } from './data.js';

const pageBody = document.body;
const errorUploadTemplate = getTemplateElement(pageBody, 'error', 'error');
const successUploadTemplate = getTemplateElement(pageBody, 'success', 'success');
const templateError = document.querySelector('#data-error').content.querySelector('.data-error');

const templates = {
  success: successUploadTemplate,
  error: errorUploadTemplate
};

const PopupTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const showPopup = (type) => {
  const newPopup = templates[type].cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newPopup.remove();
    }
  };

  newPopup.addEventListener('click', ({target}) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      newPopup.remove();
      document.removeEventListener('keydown', onDocumentKeydown, {once: true});
    }
  });

  document.addEventListener('keydown', onDocumentKeydown, {once: true});

  pageBody.append(newPopup);
};

const shownToastError = (errorMessage) => {
  const errorElement = templateError.cloneNode(true);
  document.body.appendChild(errorElement);
  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  setTimeout(() => (errorElement.remove()), ALERT_SHOW_TIME);
};

export { shownToastError, showPopup, PopupTypes };
