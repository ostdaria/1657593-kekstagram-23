import {body} from './form.js';
import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentCount = document.querySelector('.comments-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureButtonClose = document.querySelector('.big-picture__cancel');

const commentsList = document.querySelector('.social__comments');
// const commentElement = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// const MAX_COUNT_SHOW_COMMENT = 5;
const AVATAR_SIZE = 35;


const commentFragment = document.createDocumentFragment();

//Список комментария под фотографией
//добавление комметария в блок social__comments
const createCommentFragment = (picture) => {
  const commentBlockElement =  document.createElement('li');
  const commentPicture = document.createElementNS('img');
  const commentText = document.createElement('p');

  commentBlockElement.classList.add('social__comment');
  commentPicture.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentPicture.src = picture.url;
  commentPicture.alt = picture.name;
  commentPicture.width = AVATAR_SIZE;
  commentPicture.height = AVATAR_SIZE;

  commentText.textContent = picture.message;

  commentBlockElement.appendChild(commentPicture);
  commentBlockElement.appendChild(commentText);

  commentFragment.appendChild(commentBlockElement);
};


const removeComments = () => {
  bigPicture.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};


//Заполнение данных о конкретной фотографии
const createBigPictures = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikesCount.textContent = data.likes;
  bigPictureCommentCount.textContent = data.comments;
  bigPictureDescription.textContent = data.description;

  data.comments.forEach(createCommentFragment);
  commentsList.appendChild(commentFragment);
};


//Закрытия окна по нажатию клавиши Esc
const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Объявление функции для показа большой фотографии
//Добавление класса hidden блокам счётчика комментариев .social__comment-count
//и загрузки новых комментариев, для их скрытия после открытия окна
function openBigPicture (data) {
  removeComments();
  createBigPictures(data);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onPictureEscKeydown);
}


//Оъявление функции для скрытия большой фотографии
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onPictureEscKeydown);
}


//Закрытие окна при клике на иконку
bigPictureButtonClose.addEventListener('click', () => {
  closeBigPicture();
});


export {openBigPicture, onPictureEscKeydown};
