import {getRandomInt, getRandomArrayElement, getFreeId} from './util.js';
const AMOUNT_OF_POSTS = 25;
const MAX_AMOUNT_OF_COMMENTS = 4;
const MAX_ID = 25;
const ARRAY_OF_ID = Array(AMOUNT_OF_POSTS).fill(false);
const ARRAY_OF_URL = Array(AMOUNT_OF_POSTS).fill(false);

const NAMES = [
  'Марк',
  'Анна',
  'Анастасия',
  'Виктор',
  'Константин',
  'Светлана',
  'Анатолий',
  'Елена',
  'Юрий',
];

const arrayIdNames = Array(10 * NAMES.length).fill(false);

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Дада, это я!',
  'Опять съела сладкое, а все потому, что каждую секунду в мире 200 человек празднуют свой день рождения ;)',
  'Чур без зависти💅',
  'Не перебивайте меня, когда я вас игнорирую',
  'Когда план А не сработал, то всегда есть еще много букв в алфавите',
  'У самурая нет цели, только путь😎',
  'У мечты нет срока годности, продолжаем',
  'Уровень моей уверенности? Это фото без фильтра',
  'У меня нет иммунитета от комплиментов',
  '#хайпуля'
];

const createComment = () => ({
  id: getFreeId(arrayIdNames),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(SENTENCES),
  name: getRandomArrayElement(NAMES)
});

const createDescription = () => ({
  id: getFreeId(ARRAY_OF_ID),
  url: `photos/${getFreeId(ARRAY_OF_URL, 1, MAX_ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(1, MAX_AMOUNT_OF_COMMENTS)}, createComment)
});

const getPhotos = () => Array.from({length: AMOUNT_OF_POSTS}, createDescription);

export {getPhotos};
