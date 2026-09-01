import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initUploadForm } from './upload-form.js';

renderThumbnails(getPhotos());
initUploadForm();
