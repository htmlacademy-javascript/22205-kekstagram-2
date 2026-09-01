import { renderThumbnails } from './thumbnails.js';
import { initUploadForm } from './upload-form.js';
import { getData } from './api.js';
import { showDataError } from './message.js';

initUploadForm();

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch(() => {
    showDataError();
  });
