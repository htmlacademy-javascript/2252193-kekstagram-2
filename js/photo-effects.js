import {NO_EFFECT,EFFECT_CONFIG} from './const-effects.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const imgUploadSection = document.querySelector('.img-upload__overlay');
const imgEffectsFieldset = document.querySelector('.img-upload__effects');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadSection.querySelector('.effect-level__slider');
const effectInputValue = imgUploadSection.querySelector('.effect-level__value');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');

const uiSlider = noUiSlider.create(effectLevelSlider, {
  range: {min: 0, max: 1,},
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderConfig = (effectName) => {
  effectLevelSlider.noUiSlider.updateOptions(effectName.options);
};

const imageEffectReset = () => {
  imgUploadPreview.style.filter = NO_EFFECT;
  imgUploadPreview.className = '';
  effectInputValue.value = '';
  effectSliderContainer.classList.add('hidden');
};

const onChangeImageEffect = (evt) => {
  const effectName = evt.target.value;
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add(`effects__preview--${effectName}`);
  if (effectName === NO_EFFECT) {
    imageEffectReset();
  } else {
    effectSliderContainer.classList.remove('hidden');
    updateSliderConfig(EFFECT_CONFIG[effectName]);
  }
};

const onEffectValueChange = (handlersValue) => {
  const value = handlersValue[0];
  const effectName = imageUploadForm.effect.value;
  if (effectName === NO_EFFECT) {
    return;
  }
  const filterName = EFFECT_CONFIG[effectName].style;
  const filterUnits = EFFECT_CONFIG[effectName].unit;
  imgUploadPreview.style.filter = `${filterName}(${value}${filterUnits})`;
  effectInputValue.value = value;
};

uiSlider.on('update', onEffectValueChange);

imgEffectsFieldset.addEventListener('change', onChangeImageEffect);

export {onChangeImageEffect};
