import {initThumbsListener, renderThumbs} from './thumbnail-maker.js';
import { initUploadModal } from './upload-photo-form.js';
import { formValidate } from './validation-form.js';
import './scale-buttons.js';
import { effectsListener } from './photo-effects.js';
import { getDataFromServer } from './server-api.js';
import { disableFilterPosts, initPostsFilter } from './posts-filter.js';
import './upload-user-photo.js';

getDataFromServer((posts) => {
  renderThumbs(posts);
  initThumbsListener(posts);
  initPostsFilter(posts);
});

effectsListener();
formValidate();
initUploadModal();
effectsListener();
disableFilterPosts();
