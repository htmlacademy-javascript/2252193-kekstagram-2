import {getPhotoArray} from './post-maker.js';
import {renderThumbs, initThumbsListener} from './thumbnails-maker.js';

const postsData = getPhotoArray();
renderThumbs(postsData);
initThumbsListener(postsData);
