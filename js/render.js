import { openWindow } from './full-size.js';

const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const addCheckHandler = (picture2, post) => {
  picture2.addEventListener('click', (evt) => {
    evt.preventDefault();
    openWindow(post);
  });
};

const renderPost = (post) => {
  const cloneOfPicture = picture.cloneNode(true);
  cloneOfPicture.querySelector('.picture__img').src = post.url;
  cloneOfPicture.querySelector('.picture__likes').textContent = post.likes;
  cloneOfPicture.querySelector('.picture__comments').textContent = post.comments.length;
  addCheckHandler(cloneOfPicture, post);
  pictures.appendChild(cloneOfPicture);
};

const renderPosts = (posts) => {
  for (const post of posts) {
    renderPost(post);
  }
};

export { renderPosts };
