const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const valueInputElement = modalElement.querySelector('.scale__control--value');
const imagePreviewElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  valueInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(valueInputElement.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(valueInputElement.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= MAX_SCALE) {
    scaleImage(newValue);
  }
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

const initScale = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export {
  resetScale,
  initScale,
};
