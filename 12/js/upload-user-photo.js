import { ALERT_SHOW_TIME } from './data.js';

const FILE_TYPES = ['jpg','jpeg','png','gif'];

const uploadForm = document.querySelector('.img-upload__form');
const fileUpload = uploadForm.querySelector('#upload-file');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');
const templateError = document.querySelector('#data-error').content.querySelector('.data-error');

const shownToastError = (errorMessage) => {
  const errorElement = templateError.cloneNode(true);
  document.body.appendChild(errorElement);
  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  setTimeout(() => (errorElement.remove()), ALERT_SHOW_TIME);
};

fileUpload.addEventListener('change', () => {
  const file = fileUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    imgUploadPreview.src = url;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    shownToastError('Неверный тип файла');
  }
});
