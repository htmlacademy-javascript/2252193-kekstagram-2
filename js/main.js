import {getPhotoArray} from './render-posts.js';
import {renderThumbs, initThumbsListener} from './render-thumbs.js';

const postsData = getPhotoArray();
renderThumbs(postsData);
initThumbsListener(postsData);
