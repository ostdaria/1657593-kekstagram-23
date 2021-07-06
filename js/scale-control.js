const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const scalelValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview');

let currentScale = 100;

const getPictureScale = (newScale) => {
  scalelValue.value = `${newScale}%`;
  picturePreview.style = `transform: scale(${newScale / 100})`;
  currentScale = newScale;
};

const minusButtonClickHandler = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    getPictureScale(currentScale);
  }
};

const plusButtonClickHandler = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    getPictureScale(currentScale);
  }
};

minusButton.addEventListener('click', minusButtonClickHandler);
plusButton.addEventListener('click', plusButtonClickHandler);
