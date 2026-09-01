import { renderThumbnails } from './thumbnails.js';
import { initUploadForm } from './upload-form.js';
import { getData } from './api.js';
import { showDataError } from './message.js';
import { initFilters } from './filters.js';
import { debounce } from './util.js';

initUploadForm();

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos, debounce(renderThumbnails));
  })
  .catch(() => {
    showDataError();
  });
