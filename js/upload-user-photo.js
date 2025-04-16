import { shownToastError } from './util.js';
import { closePhotoEditor } from './upload-photo-form.js';

const FILE_TYPES = ['jpg','jpeg','png','gif'];

const uploadForm = document.querySelector('.img-upload__form');
const fileUpload = uploadForm.querySelector('input[type=file]');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');

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
    return;
  }

  closePhotoEditor();
});
