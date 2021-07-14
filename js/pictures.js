import {getData} from './api.js';
import {openBigPicture, onPictureEscKeydown} from './picture-big.js';
import {debounce, shuffle} from './utils.js';

const RERENDER_DELAY = 500;
const NUMBER_RANDOM_PICTURES = 10;

const listPicturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const filtersForm = document.querySelector('.img-filters__form');
const defaultPicturesButton = filtersForm.querySelector('#filter-default');
const randomPicturesButton = filtersForm.querySelector('#filter-random');
const discussedPicturesButton = filtersForm.querySelector('#filter-discussed');


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


const generateRandomPicturesArray = (defaultArray) => {
  const newCommentsArray = defaultArray.slice(0);

  return shuffle(newCommentsArray).slice(0, NUMBER_RANDOM_PICTURES);
};


const sortPhotosArray = (defaultArray) => {
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
    const photosListFragment = renderPictures(photosArray, pictureTemplateElement);

    listPicturesElement.appendChild(photosListFragment);
  },
  RERENDER_DELAY,
));


getData(
  (photos) => {
    const photosListFragment = renderPictures(photos, pictureTemplateElement);
    listPicturesElement.appendChild(photosListFragment);

    filtersForm.addEventListener('click', (evt) => {
      switch (evt.target.id) {
        case ('filter-default'):
          filterButtonsClickHandler(randomPicturesButton, discussedPicturesButton, defaultPicturesButton);
          createPictures(photos);
          break;
        case ('filter-random'):
          filterButtonsClickHandler(defaultPicturesButton, discussedPicturesButton, randomPicturesButton);
          createPictures(generateRandomPicturesArray(photos));
          break;
        case ('filter-discussed'):
          filterButtonsClickHandler(randomPicturesButton, defaultPicturesButton, discussedPicturesButton);
          createPictures(sortPhotosArray(photos));
          break;
      }
    });
  });

export {renderPictures};
