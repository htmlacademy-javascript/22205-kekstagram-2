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

const changeScale = (step) => {
  const currentValue = parseInt(valueInputElement.value, 10);
  const newValue = currentValue + step;
  if (newValue >= MIN_SCALE && newValue <= MAX_SCALE) {
    scaleImage(newValue);
  }
};

const onSmallerButtonClick = () => {
  changeScale(-SCALE_STEP);
};

const onBiggerButtonClick = () => {
  changeScale(SCALE_STEP);
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
