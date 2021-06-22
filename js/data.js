import {getRandomIntegral, getRandomArrayElement} from './utils.js';

const COUNT_PHOTO = 25;
const COUNT_COMMENTS = 25;

const NAMES = [
  'Александр',
  'Дмитрий',
  'Андрей',
  'Артём',
  'Кирилл',
  'Михаил',
  'Никита',
  'Матвей',
  'Роман',
  'Егор',
  'Иван',
  'Павел',
  'Руслан',
];

const DESCRITPIONS = [
  'Это портрет мужчины средних лет',
  'На картине изображен ребенок, стоящий в центре комнаты',
  'Женщина прогуливается вдоль берега',
  'Снаружи идет дождь и виднеется дом',
  'На этой фотографии мы видим человека, играющего на гитаре в парке.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
];

const getRandomComment = () => {
  return {
    id: getRandomIntegral(1, 25),
    avatar: `img/avatar-${getRandomIntegral(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const commentBlocks = new Array(COUNT_COMMENTS).fill(null).map(getRandomComment);

const createPhoto = () => {
  return {
    id: getRandomIntegral(1, 25),
    url: `photos/${getRandomIntegral(1, 25)}.jpg`,
    likes: getRandomIntegral(15, 200),
    description: getRandomArrayElement(DESCRITPIONS),
    comments: getRandomArrayElement(commentBlocks),
  };
};

const createPhotos = new Array(COUNT_PHOTO).fill(null).map(createPhoto);

export {createPhotos};
