import {isEscEvent, isValidString} from './utils.js';
import {getPictureScale} from './scale-control.js';
import {sendData} from './api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const DEFAULT_SCALE_VALUE = 100;
const re =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const body = document.querySelector('body');
const formOpen = document.querySelector('.img-upload__overlay');
const userModalOpenForm = document.querySelector('#upload-file');
const userModalCloseForm = document.querySelector('#upload-cancel');
const userHashtags = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const userForm = document.querySelector('.img-upload__form');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');


//Записываем обработчик в переменную
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};


//Объявление функции для показа формы
function openUserModal () {
  formOpen.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}


//Оъявление функции для скрытия формы
function closeUserModal () {
  userModalOpenForm.value = '';
  userHashtags.value = '';
  userComment.value = '';

  formOpen.classList.add('hidden');
  body.classList.remove('modal-open');
  getPictureScale(DEFAULT_SCALE_VALUE);

  document.removeEventListener('keydown', onPopupEscKeydown);
}


//в обработчике используем наши функции открытия
userModalOpenForm.addEventListener('click', () => {
  openUserModal();
});


//В обработчике используем наши функции закрытия
userModalCloseForm.addEventListener('click', () => {
  closeUserModal();
});


//Праверка хэштегов
const checkValidHashtags = (evt) => {
  evt.preventDefault();
  const hashtagArray = [];

  // //Метод toLowerCase() возвращает значение строки, на которой он был вызван; метод split возращает новый массив
  const hashtags = userHashtags.value.toLowerCase().split(' ');

  if (hashtags.length > 5 ) {
    userHashtags.setCustomValidity(`Нельзя указывать больше ${MAX_HASHTAG_COUNT} хэштегов к фотографии`);
  }  else if (hashtags.length < 1) {
    userHashtags.setCustomValidity('');
  }  else { userHashtags.setCustomValidity('');
  }
  userHashtags.reportValidity();

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length < 1) {
      userHashtags.setCustomValidity('');
    } else if (re.test(hashtags[i]) === false) {
      userHashtags.setCustomValidity('Неверный параметр');
    } else if (hashtags[i].length > 20) {
      userHashtags.setCustomValidity(`Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
    } else if (hashtagArray.includes(hashtags[i])) {
      userHashtags.setCustomValidity('Один и тот же хэштег не может быть использован дважды. Хэштеги нечувствительны к регистру');
    } else if (!hashtagArray.includes(hashtags[i])) {
      hashtagArray.push(hashtags[i]);
    } else {userHashtags.setCustomValidity('');}
    userHashtags.reportValidity();
  }
};

userHashtags.addEventListener('input', checkValidHashtags);


//Проверка длины комментария
userComment.addEventListener('input', () => {
  if (isValidString(userComment.value, MAX_COMMENT_LENGTH) === false) {
    userComment.setCustomValidity(`Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`);
    userComment.style.border = '2px solid red';
  } else {
    userComment.setCustomValidity('');
    userComment.style.border = 'none';
  }
  userComment.reportValidity();
});


const removeEventListeners = (event) => {
  document.removeEventListener('click', event);
  document.removeEventListener('keydown', event);
};

const popupEventsHandler = (evt) => {
  if (isEscEvent(evt)) {
    document.body.lastChild.remove();
    removeEventListeners(popupEventsHandler);
  } else if (evt.target === document.body.lastChild) {
    document.body.lastChild.remove();
    removeEventListeners(popupEventsHandler);
  }
};

const popupClickHandler = () => {
  document.body.lastChild.remove();
  removeEventListeners(popupEventsHandler);
};

const popupOpenHandler = (template, button) => {
  closeUserModal();
  document.body.append(template);

  document.removeEventListener('keydown', onPopupEscKeydown);

  button.addEventListener('click', popupClickHandler);
  document.addEventListener('keydown', popupEventsHandler);
  document.addEventListener('click', popupEventsHandler);
};

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => popupOpenHandler(successPopup, successButton),
      () => popupOpenHandler(errorPopup, errorButton),
      new FormData(evt.target),
    );
  });
};

export {body, setUserFormSubmit};
