import {createPhotos} from './data.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createPhotos();

const similarPictureFragment = document.createDocumentFragment();

const renderPicture = ({url, likes, comments}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarPictureFragment.appendChild(pictureElement);

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const picturesElement = renderPicture(picture);
    fragment.appendChild(picturesElement);
  });
  picturesElement.appendChild(fragment);
};
