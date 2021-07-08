import {picturePreview} from './scale-control.js';

const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectsForm = document.querySelector('.img-upload__effects');

const effects = {
  chrome: {
    name: 'grayscale',
    htmlClass: 'effects__preview--chrome',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    name: 'sepia',
    htmlClass: 'effects__preview--sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    name: 'invert',
    htmlClass: 'effects__preview--marvin',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  phobos: {
    name: 'blur',
    htmlClass: 'effects__preview--phobos',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  heat: {
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
  sliderWrapper.classList.remove('visually-hidden');
  picturePreview.classList = 'img-upload__preview';
  picturePreview.classList.add(`${effectClass}`);

  //события update, которое будет вызвано при изменении положения слайдера,
  //и выводить в консоль параметры колбека.
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

//Инструкция switch сравнивает выражение со случаями,
//перечисленными внутри неё, а затем выполняет соответствующие инструкции.
effectsForm.addEventListener('click', (evt) => {
  switch (evt.target.id) {
    case ('effect-none'):
      picturePreview.classList = 'img-upload__preview';
      sliderWrapper.classList.add('visually-hidden');
      picturePreview.style.filter = 'none';
      break;
    case ('effect-chrome'):
      showEffect(effects.chrome.htmlClass, effects.chrome.name, effects.chrome.unit);
      sliderOptionsHandler(effects.chrome.min, effects.chrome.max, effects.chrome.start, effects.chrome.step);
      break;
    case ('effect-sepia'):
      showEffect(effects.sepia.htmlClass, effects.sepia.name, effects.sepia.unit);
      sliderOptionsHandler(effects.sepia.min, effects.sepia.max, effects.sepia.start, effects.sepia.step);
      break;
    case ('effect-marvin'):
      showEffect(effects.marvin.htmlClass, effects.marvin.name, effects.marvin.unit);
      sliderOptionsHandler(effects.marvin.max, effects.marvin.min, effects.marvin.start, effects.marvin.step);
      break;
    case ('effect-phobos'):
      showEffect(effects.phobos.htmlClass, effects.phobos.name, effects.phobos.unit);
      sliderOptionsHandler(effects.phobos.max, effects.phobos.min, effects.phobos.start, effects.phobos.step);
      break;
    case ('effect-heat'):
      showEffect(effects.heat.htmlClass, effects.heat.name, effects.heat.unit);
      sliderOptionsHandler(effects.heat.max, effects.heat.min, effects.heat.start, effects.heat.step);
      break;
  }
});
