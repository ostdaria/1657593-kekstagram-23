const ALERT_SHOW_TIME = 5000;

//Функция возвращающая случайное целое число
const getRandomIntegral = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Значение должно быть больше или равны нулю');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
// getRandomIntegral(0, 5);


//Функция для проверки максимальной длины строки
const isValidString = (string, maxLength) => string.length <= maxLength;


//Отдельная функция которая вбирает в себя логику по поиску случайного элемента в переданном массиве
const getRandomArrayElement = (elements) => elements[getRandomIntegral(0, elements.length - 1)];


//Функция проверки нажатия клавиши Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл "поставить таймаут - удалить таймаут" будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


// Перемешивание массива
// Источник - https://learn.javascript.ru/task/sort-by-field
const shuffle = (pictures) => {
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }
  return pictures;
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

export {getRandomIntegral, getRandomArrayElement,isEscEvent, isValidString, showAlert, debounce, shuffle};
