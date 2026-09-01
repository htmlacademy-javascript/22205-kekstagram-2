const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imagePreviewElement = modalElement.querySelector('.img-upload__preview img');
const effectsListElement = modalElement.querySelector('.effects__list');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectLevelValueElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const isDefaultEffect = () => chosenEffect === Effect.DEFAULT;

const setEffectStyle = (value) => {
  if (isDefaultEffect()) {
    imagePreviewElement.style.filter = '';
    return;
  }

  const { style, unit } = effectToFilter[chosenEffect];
  imagePreviewElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;
  setEffectStyle(sliderValue);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = () => {
  if (isDefaultEffect()) {
    hideSlider();
    imagePreviewElement.style.filter = '';
    effectLevelValueElement.value = '';
    return;
  }

  const { min, max, step } = effectToFilter[chosenEffect];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });

  showSlider();
};

const onEffectsListChange = (evt) => {
  const effectRadio = evt.target.closest('.effects__radio');
  if (!effectRadio) {
    return;
  }

  chosenEffect = effectRadio.value;
  updateSlider();
};

const resetEffects = () => {
  chosenEffect = Effect.DEFAULT;
  updateSlider();
};

const initEffects = () => {
  createSlider();
  effectsListElement.addEventListener('change', onEffectsListChange);
};

export {
  resetEffects,
  initEffects,
};
