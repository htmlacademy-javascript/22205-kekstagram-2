import { isEscapeKey } from './util.js';
import { validateForm, resetValidation } from './validation.js';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelButtonElement = formElement.querySelector('#upload-cancel');
const fileFieldElement = formElement.querySelector('#upload-file');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagsFieldElement ||
  document.activeElement === commentFieldElement;

const closeFormModal = () => {
  formElement.reset();
  resetValidation();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeFormModal();
  }
}

const onFileInputChange = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onCancelButtonClick = () => {
  closeFormModal();
};

const onFormSubmit = (evt) => {
  const isValid = validateForm();
  if (!isValid) {
    evt.preventDefault();
  }
};

const initUploadForm = () => {
  fileFieldElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

export { initUploadForm };
