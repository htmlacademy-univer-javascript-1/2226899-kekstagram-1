const bigPictureElement = document.querySelector('.big-picture');
const loadMoreButton = bigPictureElement.querySelector('.social__comments-loader');
const commentCounter = bigPictureElement.querySelector('.social__comment-count');
const windowComments = bigPictureElement.querySelector('.social__comments');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

let counter = 0;

let comments;

const closeWindow = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', isEscHandler);
  closeButton.removeEventListener('click', closeWindow);
  loadMoreButton.removeEventListener('click', onLoadMoreButton);
};

function isEscHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow();
  }
}

closeButton.addEventListener('click', () => {
  closeWindow();
});

document.addEventListener('keydown', isEscHandler);

const constructComment = (comment) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');

  li.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  li.appendChild(img);
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.appendChild(p);
  return li;
};

function onLoadMoreButton() {
  for (let i = counter; i < counter + 5; i++) {
    const stringNumberComments = ` из ${comments.length} комментариев`;
    if (i === comments.length - 1) {
      loadMoreButton.classList.add('hidden');
    }
    if (i >= comments.length) {
      break;
    }
    const li = constructComment(comments[i]);
    windowComments.appendChild(li);
    commentCounter.textContent = `${i+1}${stringNumberComments}`;
  }
  counter += 5;
}

const openWindow = (post) => {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPictureElement.querySelector('.likes-count').textContent = post.likes;
  bigPictureElement.querySelector('.social__caption').textContent = post.description;
  const socialCommentElement = bigPictureElement.querySelectorAll('.social__comment');

  closeButton.addEventListener('click', closeWindow);
  document.addEventListener('keydown', isEscHandler);

  for (const comment of socialCommentElement) {
    comment.remove();
  }

  comments = post.comments;

  if (comments.length <= 5) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
    loadMoreButton.addEventListener('click', onLoadMoreButton);
  }

  let numberComments;
  const stringNumberComments = ` из ${comments.length} комментариев`;
  if (comments.length < 6) {
    numberComments = comments.length;
    commentCounter.textContent = `${comments.length}${stringNumberComments}`;
  } else {
    numberComments = 5;
    commentCounter.textContent = `${5}${stringNumberComments}`;
  }
  for (let i = 0; i < numberComments; i++) {
    const li = constructComment(comments[i]);
    windowComments.appendChild(li);
    counter = i + 1;
  }

};

export { openWindow };
