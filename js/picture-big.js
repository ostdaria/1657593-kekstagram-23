import {body} from './form.js';
import {isEscEvent} from './utils.js';

// const MAX_COUNT_SHOW_COMMENT = 5;
const COMMENTS_LOAD_STEP = 5;
const AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentCount = document.querySelector('.comments-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureButtonClose = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let currentComments = [];


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

  commentsList.appendChild(commentBlockElement);
};


const createComments = (comments) => comments.forEach(createCommentFragment);

const createMoreCommentsFragment = () => {
  const showCommentsCount = document.querySelectorAll('.social__comment');

  //Метод slice() возвращает новый массив, содержащий копию части исходного массива.
  createComments(currentComments.slice(showCommentsCount, showCommentsCount + COMMENTS_LOAD_STEP));

  const numberComments = document.querySelectorAll('.social__comment').length;
  if (numberComments === currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = `${numberComments} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};


//Закрытия окна по нажатию клавиши Esc
const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


//Отрытие окна с фото и заполнение данных о фотографии
const openBigPicture = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikesCount.textContent = data.likes;
  bigPictureCommentCount.textContent = data.comments;
  bigPictureDescription.textContent = data.description;

  commentsList.innerHTML = '';
  currentComments = data.comments;
  createMoreCommentsFragment(data.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscKeydown);
};

//Закрытие окна с фото
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPictureEscKeydown);
};


//Закрытие окна при клике на иконку
bigPictureButtonClose.addEventListener('click', () => {
  closeBigPicture();
});

//Загрузка новых комментарий при нажатии на кнопку
commentsLoader.addEventListener('click', () => {
  createMoreCommentsFragment();
});


export {openBigPicture, closeBigPicture, bigPictureButtonClose, onPictureEscKeydown};
