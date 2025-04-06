import {getPhotoArray} from './post-maker.js';
import {renderThumbs, initThumbsListener} from './thumbnail-maker.js';
import {initUploadModal} from './upload-photo-form.js';
import './validation-form.js';

const postsData = getPhotoArray();

renderThumbs(postsData);
initThumbsListener(postsData);
initUploadModal();
