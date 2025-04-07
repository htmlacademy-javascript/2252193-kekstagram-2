import {EFFECT_LEVEL_MAX} from './data.js'

const uploadForm = document.querySelector('.img-upload__form');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

effectLevelInput.value = EFFECT_LEVEL_MAX;

const getUpdateSliderOptions = (effect, sliderElement) => {
  
}
