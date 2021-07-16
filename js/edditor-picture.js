import {picturePreview} from './scale-control.js';

const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const effectsForm = document.querySelector('.img-upload__effects');


const effects = {
  'effect-chrome': {
    name: 'grayscale',
    htmlClass: 'effects__preview--chrome',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  'effect-sepia': {
    name: 'sepia',
    htmlClass: 'effects__preview--sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  'effect-marvin': {
    name: 'invert',
    htmlClass: 'effects__preview--marvin',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  'effect-phobos': {
    name: 'blur',
    htmlClass: 'effects__preview--phobos',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  'effect-heat': {
    name: 'brightness',
    htmlClass: 'effects__preview--heat',
    unit: '',
    min: 1,
    max: 3,
    step: 1,
    start: 3,
  },
};


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


const showEffect = (effectClass, effectStyle, effectUnit) => {
  sliderWrapperElement.classList.remove('visually-hidden');
  picturePreview.classList = 'img-upload__preview';
  picturePreview.classList = '';
  picturePreview.classList.add(`${effectClass}`);

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectValue.value = unencoded[handle];
    picturePreview.style.filter = `${effectStyle}(${effectValue.value}${effectUnit})`;
  });
};


const sliderOptionsHandler = (minValue, maxValue, startValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });
};


const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
  }
  effectValue.value = '';
  picturePreview.style.filter = '';
};


const onFilterChange = (evt) => {
  const effectId = evt.target.id;
  if (effectId === 'effect-none') {
    picturePreview.classList = 'img-upload__preview';
    sliderWrapperElement.classList.add('visually-hidden');
    picturePreview.style.filter = 'none';
    destroySlider();
    return;
  }

  const effect = effects[effectId];
  if (effect) {
    showEffect(effect.htmlClass, effect.name, effect.unit);
    sliderOptionsHandler(effect.min, effect.max, effect.start, effect.step);
  }
};

effectsForm.addEventListener('click', onFilterChange);
