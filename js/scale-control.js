const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');

let currentScale = 100;

const getPictureScale = (value) => {
  scaleValue.value = `${value}%`;
  picturePreview.style.transform = `scale(${value / 100})`;
  currentScale = value;
};

const onMinusButtonClickHandler = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    getPictureScale(currentScale);
  }
};

const onPlusButtonClickHandler = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    getPictureScale(currentScale);
  }
};

minusButton.addEventListener('click', onMinusButtonClickHandler);
plusButton.addEventListener('click', onPlusButtonClickHandler);


export {picturePreview, getPictureScale, DEFAULT_SCALE_VALUE};
