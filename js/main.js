import { initForm } from './form.js';
import { firstRenderPosts } from './render.js';
import { getData } from './api.js';
import { showError } from './util.js';
import { initLoad } from './loader.js';

initForm();
initLoad();

getData(firstRenderPosts, showError);
