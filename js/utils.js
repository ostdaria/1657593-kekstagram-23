//Функция возвращающая случайное целое число
const getRandomIntegral = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Значение должно быть больше или равны нулю');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
getRandomIntegral(0, 5);


//Функция для проверки максимальной длины строки
const isValidString = (string, maxLength) => string.length <= maxLength;


//Отдельная функция которая вбирает в себя логику по поиску случайного элемента в переданном массиве
const getRandomArrayElement = (elements) => elements[getRandomIntegral(0, elements.length - 1)];


//Функция проверки нажатия клавиши Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {getRandomIntegral, getRandomArrayElement};
export {isEscEvent, isValidString};
