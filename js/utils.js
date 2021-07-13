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


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay) => {
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
};

//Функция проверки нажатия клавиши Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {getRandomIntegral, getRandomArrayElement, debounce};
export {isEscEvent, isValidString};
