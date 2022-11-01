import {getPhotos} from './data.js';
import {renderPictures} from './render.js';
import {openWindow, window} from './full-size.js';

const photos = getPhotos();
renderPictures(photos);

const pictures = document.querySelector('.pictures');

const addCheckHandler = (photo) => {
  const srcImage = `img[src="${photo.url}"]`;
  const picture = pictures.querySelector(srcImage).parentNode;
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.body.classList.add('modal-open');
    openWindow(photo);
  });
};

for (const post of photos) {
  addCheckHandler(post);
}

const closeButton = window.querySelector('.big-picture__cancel');

closeButton.addEventListener('click', () => {
  window.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    window.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
