import { SCALE_STEP } from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const smallerButton = uploadForm.querySelector('.scale__control--smaller');
const biggerButton = uploadForm.querySelector('.scale__control--bigger');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');

let scale = 1;

const onSmallerButtonClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerButtonClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const resetScale = () => {
  scale = 1;
  imgPreview.style.transform = `scale(${scale})`;
};

smallerButton.addEventListener('click', onSmallerButtonClick);

biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
