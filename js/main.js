import {getPhotoArray} from './post-maker.js';
import {thumbnailList, container} from './thumbnail-maker.js';
import {openBigPicture} from './photo-maker.js';

const postsData = getPhotoArray();
thumbnailList(postsData);

container.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');

  if (currentThumbnail) {
    openBigPicture(currentThumbnail.dataset.pictureId);
  }
});

export {postsData};
