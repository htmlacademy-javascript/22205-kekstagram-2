import { isEscapeKey } from './util.js';
import { validateForm, resetValidation } from './validation.js';
import { resetScale, initScale } from './scale.js';
import { resetEffects, initEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправка...',
};

const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelButtonElement = formElement.querySelector('#upload-cancel');
const fileFieldElement = formElement.querySelector('#upload-file');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('#upload-submit');

const isTextFieldFocused = () =>
  document.activeElement === hashtagsFieldElement ||
  document.activeElement === commentFieldElement;

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const closeFormModal = () => {
  formElement.reset();
  resetValidation();
  resetScale();
  resetEffects();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
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

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeFormModal();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

const initUploadForm = () => {
  initScale();
  initEffects();
  fileFieldElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

export { initUploadForm };
