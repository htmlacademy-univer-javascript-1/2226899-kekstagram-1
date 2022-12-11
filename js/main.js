import { getPhotos } from './data.js';
import { renderPosts } from './render.js';
import { initForm } from './form.js';
import { initValidation } from './validation.js';

initValidation();
initForm();

const photos = getPhotos();
renderPosts(photos);
