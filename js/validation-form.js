const uploadForm = document.querySelector('.img-upload__form');
const textInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput, (value) => /^#[a-zа-яё0-9]{1,19}$/i.test(value), 'Ошибка');

pristine.addValidator(textInput, (value) => value.length <= 140, 'Ошибка');
