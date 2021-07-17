import {isEscEvent, isValidString} from './utils.js';
import {getPictureScale, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {sendData} from './api.js';
import {destroySlider} from './edditor-picture.js';


const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const re =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const body = document.querySelector('body');
const formOpen = document.querySelector('.img-upload__overlay');
const userModalOpenForm = document.querySelector('.img-upload__input');
const userModalCloseForm = document.querySelector('.img-upload__cancel');
const userHashtags = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const userForm = document.querySelector('.img-upload__form');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');


const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (userHashtags === document.activeElement || userComment === document.activeElement) {
      evt.preventDefault();
    } else {
      userForm.reset();
      closeUserModal();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  }
};


const openUserModal = () => {
  formOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  getPictureScale(DEFAULT_SCALE_VALUE);
  document.addEventListener('keydown', onPopupEscKeydown);
  destroySlider();
};


function closeUserModal () {
  userModalOpenForm.value = '';
  userHashtags.value = '';
  userComment.value = '';

  formOpen.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}


userModalOpenForm.addEventListener('change', () => {
  openUserModal();
});


userModalCloseForm.addEventListener('click', () => {
  closeUserModal();
});


const onCheckValidHashtags = (evt) => {
  evt.preventDefault();
  const hashtagsArray = [];

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
    } else if (hashtagsArray.includes(hashtags[i])) {
      userHashtags.setCustomValidity('Один и тот же хэштег не может быть использован дважды. Хэштеги нечувствительны к регистру');
    } else if (!hashtagsArray.includes(hashtags[i])) {
      hashtagsArray.push(hashtags[i]);
    } else {userHashtags.setCustomValidity('');}
    userHashtags.reportValidity();
  }
};

userHashtags.addEventListener('input', onCheckValidHashtags);


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


const onPopupEventsHandler = (evt) => {
  if (isEscEvent(evt)) {
    document.body.lastChild.remove();
  } else if (evt.target === document.body.lastChild) {
    document.body.lastChild.remove();
  }
};


const onPopupClickHandler = () => {
  document.body.lastChild.remove();
};


document.removeEventListener('click', onPopupClickHandler);
document.removeEventListener('keydown', onPopupEventsHandler);


const onPopupOpenHandler = (template, button) => {
  closeUserModal();
  document.body.append(template);

  document.removeEventListener('keydown', onPopupEscKeydown);

  button.addEventListener('click', onPopupClickHandler);
  document.addEventListener('keydown', onPopupEventsHandler);
  document.addEventListener('click', onPopupEventsHandler);
};


const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onPopupOpenHandler(errorPopup, errorButton),
      () => onPopupOpenHandler(successPopup, successButton),
      new FormData(evt.target),
    );
  });
};


export {body, setUserFormSubmit};
