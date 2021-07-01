import {initUserModal} from './form.js';
import './picture-big.js';
import {createPhotos} from './data.js';
import './utils.js';
import {renderPictures} from './pictures.js';

initUserModal();
renderPictures(createPhotos());
