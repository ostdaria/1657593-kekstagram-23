import {isEscEvent} from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const re =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const body = document.querySelector('body');
const formOpen = document.querySelector('.img-upload__overlay');
const userModalOpenElement = document.querySelector('#upload-file');
const buttonCloseForm = document.querySelector('#upload-cancel');
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
  userModalOpenElement.value = '';
  userHashtags.value = '';
  userComment.value = '';

  formOpen.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}


//Загрузка обработчика изменения файла
const uploadFileChangeHandler = () => {
  openUserModal();
  document.addEventListener('keydown', onPopupEscKeydown);
};

//Загрузка обработчика нажатия кнопки отмены
const uploadCancelButtonClickHandler = () => {
  closeUserModal();
  document.addEventListener('keydown', onPopupEscKeydown);
};


userModalOpenElement.addEventListener('change', uploadFileChangeHandler);

//Закрытие формы
buttonCloseForm.addEventListener('click', uploadCancelButtonClickHandler);


//Праверка хэштегов
userHashtags.addEventListener('input', () => {
  const hashtagsArray = userHashtags.value.trim().split('');
  const lowerHastagsArray = userHashtags.value.trim().toLowerCase().split('').sort();

  userHashtags.forEach((element) => {
    if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
      return userHashtags.setCustomValidity(`Нельзя указывать больше ${MAX_HASHTAG_COUNT} хэштегов к фотографии`);
    }
    if (element.length === 1) {
      return userHashtags.setCustomValidity('Хэштег не может состоять только из одной решетки');
    }
    if (!re.test(element)) {
      return userHashtags.setCustomValidity('Хэштег начинается с символа # (решётка) и состоять максимум из 20 букв и цифр');
    }
    if (element.length > MAX_HASHTAG_LENGTH) {
      return userHashtags.setCustomValidity(`Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
    }
    return userHashtags.setCustomValidity('');
  });

  lowerHastagsArray.forEach((element, index) => {
    if (lowerHastagsArray[index] === lowerHastagsArray[index + 1]) {
      return userHashtags.setCustomValidity('Один и тот же хэштег не может быть использован дважды. Хэштеги нечувствительны к регистру');
    }
  });

  userHashtags.reportValidity();
});


//Проверка длины комментария
function checkValidationComment(value) {
  const comment = value.trim();
  if (comment.length > MAX_COMMENT_LENGTH) {
    userComment.setCustomValidity(`Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`);
  } else {
    userComment.setCustomValidity('');
    userComment.classList.remove('text__invalid');
  }
  userComment.reportValidity();
}

function initFormValidation() {
  userHashtags.addEventListener('input', (evt) => {
    checkValidationComment(evt.target.value);
  });

  //stopPropagation - прекращает передачу текущего события(при нажатии на кнопку'keydown')
  userHashtags.addEventListener('keydown', (evt) => evt.stopPropagation());

  userComment.addEventListener('input', (evt) => {
    checkValidationComment(evt.target.value);
  });

  userComment.addEventListener('keydown', (evt) => evt.stopPropagation());
}

function initUserModal() {
  userModalOpenElement.addEventListener('change', openUserModal);
  buttonCloseForm.addEventListener('click', closeUserModal);
  initFormValidation();
}


export {body, initUserModal};
