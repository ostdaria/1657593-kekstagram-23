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

const getLineLength = (line) => line.length <= 140;
getLineLength('Проверяемая строка');


const getRandomArrayElement = (elements) => {
  elements[getRandomIntegral(0, elements.length - 1)];
};

export {getRandomIntegral, getLineLength, getRandomArrayElement};