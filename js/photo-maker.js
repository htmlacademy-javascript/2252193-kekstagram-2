import {postsData} from './main.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigPicture = (pictureId) => {
  const currentPhoto = postsData.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialCurrentComment = socialComment.cloneNode(true);

    socialCurrentComment.querySelector('.social__picture').src = comment.avatar;
    socialCurrentComment.querySelector('.social__picture').alt = comment.name;
    socialCurrentComment.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCurrentComment);
  });

  socialComment.appendChild(socialCommentsFragment);
  commentsCaption.textContent = currentPhoto.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

export {openBigPicture};
