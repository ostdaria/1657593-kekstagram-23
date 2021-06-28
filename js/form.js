import {isEscEvent} from './utils.js';

const form = document.querySelector('.img-upload__form');
const buttonUploadForm = document.querySelector('#upload-file');
const formOpen = document.querySelector('.img-upload__overlay');

const body = document.querySelector('body');
const buttonCloseForm = document.querySelector('#upload__cancel');


const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
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
  formOpen.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}


//Открытие формы при нажатии на логотип
buttonUploadForm.addEventListener('click', () => {
  openUserModal();
});


//Закрытие формы
buttonCloseForm.addEventListener('click', () => {
  closeUserModal();
});

export {body};
