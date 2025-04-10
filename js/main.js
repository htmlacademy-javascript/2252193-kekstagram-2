// import {getPhotoArray} from './post-maker.js';
// import {renderThumbs, initThumbsListener} from './thumbnail-maker.js';
import {initUploadModal} from './upload-photo-form.js';
import {formValidate} from './validation-form.js';
import './scale-buttons.js';
import {effectsListener} from './photo-effects.js';
import {getData} from './api.js';

// const postsData = getPhotoArray();
const photos = getData();

// renderThumbs(photos);
// initThumbsListener(photos);
initUploadModal();
formValidate();
effectsListener();
