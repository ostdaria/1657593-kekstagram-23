import {body} from './form.js';
import {isEscEvent} from './utils.js';

const COMMENTS_LOAD_STEP = 5;
const AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentCount = document.querySelector('.comments-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureButtonClose = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let currentComments = [];


const renderCommentsList = (comments, template) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const randomComment = template.cloneNode(true);

    randomComment.querySelector('.social__picture').src = comment.avatar;
    randomComment.querySelector('.social__picture').alt = comment.name;
    randomComment.querySelector('.social__picture').width = AVATAR_SIZE;
    randomComment.querySelector('.social__picture').height = AVATAR_SIZE;
    randomComment.querySelector('.social__text').textContent = comment.message;

    commentFragment.appendChild(randomComment);
  });

  return commentFragment;
};


const showInitialCommentsArray = (commentsArray) => {

  const initialCommentsArray = commentsArray.slice(0, COMMENTS_LOAD_STEP);

  socialCommentCount.firstChild.textContent = `${initialCommentsArray.length  } из  `;
  commentsList.appendChild(renderCommentsList(initialCommentsArray, commentTemplate));

  if (initialCommentsArray.length === commentsArray.length) {
    commentsLoader.classList.add('hidden');
  }
};


const onRenderMoreCommentsFragment = () => {
  const additionalCommentsArray = currentComments.slice(commentsList.children.length, commentsList.children.length + COMMENTS_LOAD_STEP);

  commentsList.appendChild(renderCommentsList(additionalCommentsArray, commentTemplate));

  if (currentComments.length === commentsList.children.length) {
    commentsLoader.classList.add('hidden');
  }
  socialCommentCount.firstChild.textContent = `${commentsList.children.length  } из  `;
};


const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


const openBigPicture = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikesCount.textContent = data.likes;
  bigPictureCommentCount.textContent = data.comments.length;
  bigPictureDescription.textContent = data.description;

  commentsList.innerHTML = '';
  currentComments = data.comments;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');


  document.addEventListener('keydown', onPictureEscKeydown);
  commentsLoader.addEventListener('click', onRenderMoreCommentsFragment);
  showInitialCommentsArray(data.comments);
};


function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPictureEscKeydown);
  commentsLoader.removeEventListener('click', onRenderMoreCommentsFragment);
}


bigPictureButtonClose.addEventListener('click', () => {
  closeBigPicture();
});


export {openBigPicture, closeBigPicture, bigPictureButtonClose, onPictureEscKeydown};
