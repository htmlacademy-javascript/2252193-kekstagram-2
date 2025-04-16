import { renderThumbs, initThumbsListener } from './thumbnail-maker.js';
import { initUploadModal } from './upload-photo-form.js';
import { formValidate } from './validation-form.js';
import './scale-buttons.js';
import { effectsListener } from './photo-effects.js';
import { getDataFromServer } from './server-api.js';

getDataFromServer((posts) => {
  renderThumbs(posts);
  initThumbsListener(posts);
});

effectsListener();
formValidate();
initUploadModal();
effectsListener();
