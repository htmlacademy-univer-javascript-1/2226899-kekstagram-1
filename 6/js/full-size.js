const window = document.querySelector('.big-picture');

const openWindow = (photo) => {
  window.classList.remove('hidden');
  window.querySelector('.social__comment-count').classList.add('hidden');
  window.querySelector('.comments-loader').classList.add('hidden');

  window.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  window.querySelector('.likes-count').textContent = photo.likes;
  window.querySelector('.comments-count').textContent = photo.comments.length;
  window.querySelector('.social__caption').textContent = photo.description;
  const windowComments = window.querySelector('.social__comments');
  const comments = window.querySelectorAll('.social__comment');

  for (const comment of comments) {
    comment.remove();
  }

  for (const comment of photo.comments) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');

    li.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.appendChild(img);
    p.classList.add('social__text');
    p.textContent = comment.message;
    li.appendChild(p);
    windowComments.appendChild(li);
  }
};

export {openWindow, window};
