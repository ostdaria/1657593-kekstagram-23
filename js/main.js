//Функция возвращающая случайное целое число

function getRandomIntegral(min, max) {
  if (min < 0 || max < 0) {
    throw new RangeError('Значение должно быть больше или равны нулю')
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log('Случайное целое число: ' + getRandomIntegral(0, 5));


//Функция для проверки максимальной длины строки

function getLineLength(line) {
  if (line.length <= 140) {
    console.log('Проверяемая строка меньше или равна максимальной длине строки');
    return true;
  }
  console.log('Проверяемая строка больше максимальной длины строки');
  return false;
}

getLineLength('Проверяемая строка');
