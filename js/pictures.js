import { getData } from './api.js';
import {openBigPicture, onPictureEscKeydown} from './picture-big.js';

const ALERT_SHOW_TIME = 5000;

const listPicturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');


const renderPicture = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture, onPictureEscKeydown);
  });

  return pictureElement;
};


const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = renderPicture(picture);
    fragment.appendChild(pictureElement);
  });

  listPicturesElement.appendChild(fragment);
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


getData(
  (photos) => {
    const photosListFragment = renderPictures(photos, pictureTemplateElement);
    listPicturesElement.appendChild(photosListFragment);
  });

export {renderPictures, showAlert};
