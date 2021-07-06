import './form.js';
import './picture-big.js';
import {createPhotos} from './data.js';
import './utils.js';
import {renderPictures} from './pictures.js';
import './scale-control.js';

renderPictures(createPhotos());
