import { renderPosts } from './render.js';
import { initForm } from './form.js';
import { showError } from './util.js';
import { getData } from './api.js';

initForm();

getData(renderPosts, showError);
