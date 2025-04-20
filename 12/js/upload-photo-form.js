import { isEscapeKey } from './util.js';
import { resetScale } from './scale-buttons.js';
import { effectsListener, imageEffectReset, onChangeImageEffect } from './photo-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadResetButton = uploadForm.querySelector('#upload-cancel');
const imgEffectsFieldset = document.querySelector('.img-upload__effects');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const onResetButtonClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === textInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor(){
  uploadModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  resetScale();
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadResetButton.removeEventListener('click', onResetButtonClick);
  imgEffectsFieldset.removeEventListener('change', onChangeImageEffect);
  imageEffectReset();
  uploadFile.value = '';
  uploadForm.reset();
}

const initUploadModal = () => {
  uploadFile.addEventListener('change', () => {
    uploadModal.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    effectsListener();
    uploadResetButton.addEventListener('click', onResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export { initUploadModal, closePhotoEditor };
