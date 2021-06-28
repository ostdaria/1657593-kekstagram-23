const listPicturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

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

export {renderPictures};
