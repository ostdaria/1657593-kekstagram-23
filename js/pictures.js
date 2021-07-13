import {openBigPicture, onPictureEscKeydown} from './picture-big.js';
import {debounce} from './utils.js';
import {getData} from './api.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_ARRAY_LENGTH = 10;

const listPicturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const filtersForm = document.querySelector('.img-filters__form');
const defaultPicturesButton = filtersForm.querySelector('#filter-default');
const randomPicturesButton = filtersForm.querySelector('#filter-random');
const discussedPhotosButton = filtersForm.querySelector('#filter-discussed');

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


const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateRandomPhotosArray = (defaultArray) => {
  const newCommentsArray = defaultArray.slice(0);

  return shuffle(newCommentsArray).slice(0, RANDOM_PHOTOS_ARRAY_LENGTH);
};

const sortPhotosArray = (defaultArray) => {
  const discussedPhotosArray = defaultArray.slice(0);

  discussedPhotosArray.sort((a, b) => b.comments.length - a.comments.length);

  return discussedPhotosArray;
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
    const photosListFragment = renderPicture(photos, pictureTemplateElement);
    listPicturesElement.appendChild(photosListFragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', (evt) => {
      switch (evt.target.id) {
        case ('filter-default'):
          filterButtonsClickHandler(randomPicturesButton, discussedPhotosButton, defaultPicturesButton);
          createPictures(photos);
          break;
        case ('filter-random'):
          filterButtonsClickHandler(defaultPicturesButton, discussedPhotosButton, randomPicturesButton);
          createPictures(generateRandomPhotosArray(photos));
          break;
        case ('filter-discussed'):
          filterButtonsClickHandler(randomPicturesButton, defaultPicturesButton, discussedPhotosButton);
          createPictures(sortPhotosArray(photos));
          break;
      }
    });
  },
  (err) => {
    const errorDiv = document.createElement('div');
    document.body.prepend(errorDiv);
    errorDiv.textContent = `Данные не загрузились, ${err}`;
    errorDiv.style.textAlign = 'center';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.style.marginTop = '30px';
    errorDiv.addEventListener('click', () => {
      document.body.removeChild(errorDiv);
    });
    return errorDiv;
  });

export {renderPictures};
