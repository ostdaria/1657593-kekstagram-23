import {isEscEvent, isValidString} from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const re =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const body = document.querySelector('body');
const formOpen = document.querySelector('.img-upload__overlay');
const userModalOpenForm = document.querySelector('#upload-file');
const userModalCloseForm = document.querySelector('#upload-cancel');
const userHashtags = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
// const userInputText = document.querySelector('.social__footer-text');


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

  document.removeEventListener('keydown', onPopupEscKeydown);
}


//в обработчике используем наши функции открытия
userModalOpenForm.addEventListener('click', () => {
  openUserModal();
});


//в обработчике используем наши функции закрытия
userModalCloseForm.addEventListener('click', () => {
  closeUserModal();
});


userModalOpenForm.addEventListener('change', () => {
  formOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onPopupEscKeydown);
});


const checkValidHashtags = (evt) => {
  evt.preventDefault();
  //Метод toLowerCase() возвращает значение строки, на которой он был вызван; метод split возращает новый массив
  const hashtags = userHashtags.value.toLowerCase().split('');

  //Метод trim удаляет пробелы с обоих концов строки; метод split возращает новый массив
  const hashtagArray = userHashtags.value.trim().split('');

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
      userHashtags.setCustomValidity('Неверный параметр. Хэштег начинается с символа # (решётка) и состоять максимум из 20 букв и цифр');
    } else if (hashtags[i].length > 20) {
      userHashtags.setCustomValidity(`Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
    } else if (hashtagArray.includes(hashtags[i])) {
      userHashtags.setCustomValidity('Один и тот же хэштег не может быть использован дважды. Хэштеги нечувствительны к регистру');
    } else if (!hashtagArray.includes(hashtags[i])) {
      hashtagArray.push(hashtags[i]);
    } else {userHashtags.setCustomValidity('');}

    //reportValidity возвращает true если все дочерние элементы прошли проверку.
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

export {body};
