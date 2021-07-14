import './form.js';
import {setUserFormSubmit} from './form.js';
import './utils.js';
import {showAlert} from './utils.js';
import './pictures.js';
import './picture-big.js';
import './scale-control.js';
import './edditor-picture.js';
import {renderPictures} from './pictures.js';
import {getData} from './api.js';

const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise.then((data) => {
  renderPictures(data);
  showAlert();
});

setUserFormSubmit();
