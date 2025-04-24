import { renderThumbs } from './thumbnail-maker.js';
import { debounce, getRandomIntegersBetweenRange } from './util.js';

const POST_MAX_COUNT = 10;
const RERENDER_DELAY = 500;

const postsContainer = document.querySelector('.pictures');
const imgFiltersSection = document.querySelector('.img-filters');
const imgFiltersForm = imgFiltersSection.querySelector('.img-filters__form');
const filterButtons = imgFiltersSection.querySelectorAll('.img-filters__button');

const showFilterPosts = () => {
  imgFiltersSection.classList.remove('img-filters--inactive');
  imgFiltersSection.classList.add('img-filters--active');
};

const disableFilterPosts = () => {
  filterButtons.forEach((button) => {
    button.disabled = true;
  });
};

const enableFilterPosts = () => {
  filterButtons.forEach((button) => {
    button.disabled = false;
  });
};

const filterPostsDefault = (userPosts) => userPosts;

const filterPostsDiscussed = (userPosts) => userPosts.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

const filterPostsRandom = (posts, maxCount) => {
  const startIndex = 0;
  const lastIndex = posts.length - 1;
  const elementsCount = Math.min(posts.length, maxCount);
  const randomPostsIndexes = getRandomIntegersBetweenRange(startIndex, lastIndex, elementsCount);
  return randomPostsIndexes.map((index) => posts[index]);
};

const changeFilterClassName = (filterName) => {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = postsContainer.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const onBtnFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      break;
  }
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      renderThumbs(filterPostsDiscussed(userPosts));
      break;
    case 'filter-random':
      renderThumbs(filterPostsRandom(userPosts, POST_MAX_COUNT));
      break;
    case 'filter-default':
      renderThumbs(filterPostsDefault(userPosts));
      break;
  }
}, RERENDER_DELAY);

const initPostsFilter = (userPosts) => {
  imgFiltersForm.addEventListener('click', (evt) => postFilterChange(evt, userPosts));
  imgFiltersForm.addEventListener('click', onBtnFilterClick);
  showFilterPosts();
  enableFilterPosts();
};

export { initPostsFilter, disableFilterPosts };
