const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadResetButton = uploadForm.querySelector('#upload-cancel');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

// uploadForm.method = 'POST';
// uploadForm.action = 'https://31.javascript.htmlacademy.pro/kekstagram';
// uploadForm.enctype = 'multipart/form-data';

const onResetButtonClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === textInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

const closePhotoEditor = () => {
  uploadModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadResetButton.removeEventListener('click', onResetButtonClick);
  uploadFile.value = '';
};

const initUploadModal = () => {
  uploadFile.addEventListener('change', () => {
    uploadModal.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    uploadResetButton.addEventListener('click', onResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export {initUploadModal};
