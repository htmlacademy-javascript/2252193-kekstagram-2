import { openBigPicture } from './photo-maker.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.dataset.pictureId = photo.id;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const renderThumbs = (photos) => {
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

const initThumbsListener = (photos) => {
  if (!container) {
    return;
  }

  container.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('.picture');
    if (!currentThumbnail) {
      return;
    }

    const id = +currentThumbnail.dataset.pictureId;
    const currentPhoto = photos.find((photo) => photo.id === id);

    if (currentPhoto) {
      evt.preventDefault();
      openBigPicture(currentPhoto);
    }
  });
};

export { renderThumbs, initThumbsListener };
