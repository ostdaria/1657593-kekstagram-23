import {createPhotos} from './data.js';

const pictures = document.querySelector('.pictures');// В контейнер с классом pictures будут добавляться миниатюры картинок
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');// Поиск шаблона по индефикатору #picture и обращаемся к его свойству content чтобы получить доступ к документ фрагменту и находим элемент с классом .picture;

const similarPictureTemplate = createPhotos();// Создаем похожие шаблоны миниатюр и вызывем функцию createPhotos и она вернет массив из миниатюр картинок

const similarPictureFragment = document.createDocumentFragment();// Результат метода createDocumentFragment сохраняем в переменную

similarPictureTemplate.forEach(({url, likes, comments}) => {
  const createPictureTemplate = pictureTemplate.cloneNode(true);// Отрисуем шаблон похожей миниатюры и копируем из шаблона необходимые элементы - cloneNode(true)
  createPictureTemplate.querySelector('.picture__img').src = url;
  createPictureTemplate.querySelector('.picture__likes').textContent = likes;// У шаблона находим элемент который хотим изменить(.picture__likes) и с помощью метода textContent присваиваем свойство likes шаблону-миниатюре
  createPictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  similarPictureFragment.appendChild(createPictureTemplate);// Все шаблоны-миниатюры будем добавлять в similarPictureFragment;
});// Проходим по коллекцию миниатюр (методом forEach) и отрисовываем их; forEach принимает в качестве параметра функцию колбек и эта функция будет вызвана для каждого элемента массива;

pictures.appendChild(similarPictureFragment);// Разово добавим в фрагмент контейнер где будут отрисовываться все шаблоны-миниатюры
