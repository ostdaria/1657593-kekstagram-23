import {getData} from './api.js';
import {openBigPicture, onPictureEscKeydown} from './picture-big.js';
import {debounce, shuffle, showAlert} from './utils.js';

const RERENDER_DELAY = 500;
const NUMBER_RANDOM_PICTURES = 10;

const listPicturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const filtersForm = document.querySelector('.img-filters__form');
const filterDefaultButton = filtersForm.querySelector('#filter-default');
const filterRandomButton = filtersForm.querySelector('#filter-random');
const filterDiscussedButton = filtersForm.querySelector('#filter-discussed');


const renderPicture = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

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


const generateDefaultPictures = (pictures) => {
  const defaultPictures = pictures.sort((a, b) => a.id > b.id ? 1 : -1);
  return defaultPictures;
};


const generateRandomPictures = (defaultArray) => {
  const newCommentsArray = defaultArray.slice(0);
  return shuffle(newCommentsArray).slice(0, NUMBER_RANDOM_PICTURES);
};


const generateDiscussedPictures = (defaultArray) => {
  const discussedPicturesArray = defaultArray.slice(0);
  discussedPicturesArray.sort((a, b) => b.comments.length - a.comments.length);
  return discussedPicturesArray;
};


const filterButtonsClickHandler = (classRemove, classRemoveSecond, classAdd) => {
  classRemove.classList.remove('img-filters__button--active');
  classRemoveSecond.classList.remove('img-filters__button--active');
  classAdd.classList.add('img-filters__button--active');
};


const createPictures = (debounce(
  (photosArray) => {
    listPicturesElement.querySelectorAll('.picture').forEach((photo) => {
      photo.remove();
    });
    renderPictures(photosArray, pictureTemplateElement);
  },
  RERENDER_DELAY,
));


getData(
  (data) => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    createPictures(data);

    filtersForm.addEventListener('click', (evt) => {
      switch (evt.target.id) {
        case 'filter-default':
          filterButtonsClickHandler(filterRandomButton, filterDiscussedButton, filterDefaultButton);
          createPictures(generateDefaultPictures(data));
          break;
        case 'filter-random':
          filterButtonsClickHandler(filterDefaultButton, filterDiscussedButton, filterRandomButton);
          createPictures(generateRandomPictures(data));
          break;
        case 'filter-discussed':
          filterButtonsClickHandler(filterRandomButton, filterDefaultButton, filterDiscussedButton);
          createPictures(generateDiscussedPictures(data));
          break;
      }
    });
  },
  () => {
    showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.');
  });


export {renderPictures};
