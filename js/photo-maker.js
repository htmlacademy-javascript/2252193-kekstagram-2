import {clearComments, renderComments} from './render-comments.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureCancel = () => {
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

function closeBigPicture(){
  clearComments();
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancel);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const openBigPicture = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancel);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

export {openBigPicture};
