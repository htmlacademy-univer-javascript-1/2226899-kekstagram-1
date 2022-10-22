const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPicture = (post) => {
  const cloneOfPicture = picture.cloneNode(true);
  cloneOfPicture.querySelector('.picture__img').src = post.url;
  cloneOfPicture.querySelector('.picture__likes').textContent = post.likes;
  cloneOfPicture.querySelector('.picture__comments').textContent = post.comments.length;
  pictures.appendChild(cloneOfPicture);
};

const renderPictures = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    renderPicture(photos[i]);
  }
  pictures.appendChild(fragment);
};

export {renderPictures};
