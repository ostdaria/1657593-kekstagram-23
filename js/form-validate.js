import { isEscEvent } from './utils.js';

const uploadHashtag = document.querySelector('#upload-select-image');
const userHashtags = document.querySelector('.text__hashtags');
const userDescription = document.querySelector('.text__description');
const userComment = document.querySelector('.social__footer-text');

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const re =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;


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
  }
  userComment.reportValidity();
}

//Отмена обработчика Esc при фокусе
userHashtags.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

userDescription.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
