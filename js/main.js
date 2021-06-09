// const { get } = require("browser-sync");
//Функция возвращающая случайное целое число

function getRandomIntegral(min, max) {
  if (min < 0 || max < 0) {
    throw new RangeError('Значение должно быть больше или равны нулю')
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
getRandomIntegral(0, 5);


//Функция для проверки максимальной длины строки

function getLineLength(line) {
  return line.length <= 140;
}
getLineLength('Проверяемая строка');



//Задание module4-task1
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

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegral(0, elements.length - 1)];
};

const getRandomComment = () => {
  return {
    id: getRandomIntegral(1, 25) ,
    avatar: 'img/avatar-' + getRandomIntegral(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
};

const commentBlocks = new Array(COUNT_COMMENTS).fill(null).map(getRandomComment);

const createPhoto = function () {
  return {
    id: getRandomIntegral(1, 25) ,
    url: 'photos/' + getRandomIntegral(1, 25) + '.jpg',
    likes: getRandomIntegral(15, 200),
    description: getRandomArrayElement(DESCRITPIONS),
    comments: getRandomArrayElement(commentBlocks),
  }
};

const photoBlocks = new Array(COUNT_PHOTO).fill(null).map(createPhoto);
