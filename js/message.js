import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const dataErrorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

let currentMessageElement = null;

const showDataError = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const hideMessage = () => {
  if (currentMessageElement) {
    currentMessageElement.remove();
    currentMessageElement = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onDocumentClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (template, buttonClass) => {
  currentMessageElement = template.cloneNode(true);
  const closeButtonElement = currentMessageElement.querySelector(buttonClass);

  closeButtonElement.addEventListener('click', () => {
    hideMessage();
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(currentMessageElement);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};

export {
  showDataError,
  showSuccessMessage,
  showErrorMessage,
};
