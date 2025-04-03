import {getPhotoArray} from './post-maker.js';
import {renderThumbs, initThumbsListener} from './thumbnail-maker.js';
import {initUploadModal} from './upload-form';
import './validation-form';

const postsData = getPhotoArray();

renderThumbs(postsData);
initThumbsListener(postsData);
initUploadModal();
