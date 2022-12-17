import { openWindow } from './full-size.js';
import { getRandomElements, debounce } from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const filtersButtons = document.querySelector('.img-filters__form');
const defFilterButton = document.querySelector('#filter-default');
const randFilterButton = document.querySelector('#filter-random');
const discFilterButton = document.querySelector('#filter-discussed');

let newPosts, currentPosts = [];

const addCheckHandler = (picture2, post) => {
  picture2.addEventListener('click', (evt) => {
    evt.preventDefault();
    openWindow(post);
  });
};

const renderPost = (post) => {
  const newPost = picture.cloneNode(true);

  newPost.querySelector('.picture__img').src = post.url;
  newPost.querySelector('.picture__likes').textContent = post.likes;
  newPost.querySelector('.picture__comments').textContent = post.comments.length;
  addCheckHandler(newPost, post);

  fragment.appendChild(newPost);
  currentPosts.push(newPost);
};

const renderPosts = () => {
  removePosts();
  newPosts.forEach((pic) => renderPost(pic));
  pictures.appendChild(fragment);
};

const addDefFilterClass = () => {
  defFilterButton.classList.add('img-filters__button--active');
  randFilterButton.classList.remove('img-filters__button--active');
  discFilterButton.classList.remove('img-filters__button--active');
};

const addRandFilterClass = () => {
  defFilterButton.classList.remove('img-filters__button--active');
  randFilterButton.classList.add('img-filters__button--active');
  discFilterButton.classList.remove('img-filters__button--active');
};

const addDiscFilterClass = () => {
  defFilterButton.classList.remove('img-filters__button--active');
  randFilterButton.classList.remove('img-filters__button--active');
  discFilterButton.classList.add('img-filters__button--active');
};

const changeFilter = (posts, db) => {
  filtersButtons.addEventListener('click', (evt) => {
    newPosts = [...posts];
    switch (evt.target.id) {
      case 'filter-default':
        addDefFilterClass();
        break;
      case 'filter-random':
        addRandFilterClass();
        newPosts = getRandomElements(newPosts, 10);
        break;
      case 'filter-discussed':
        addDiscFilterClass();
        newPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    db();
  });
};

const firstRenderPosts = (posts) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPosts = [...posts];

  renderPosts();
  changeFilter(posts, debounce(() => renderPosts(), 500));
};

function removePosts() {
  currentPosts.forEach((pic) => pictures.removeChild(pic));
  currentPosts = [];
}

export { firstRenderPosts };
