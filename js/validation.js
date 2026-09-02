const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const TAG_ERROR_TEXTS = {
  INVALID_COUNT: `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Хэштег должен начинаться с #, без спецсимволов и пробелов (до 20 символов)',
};

const COMMENT_ERROR_TEXT = `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`;

const formElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) => tagString.trim().split(/\s+/).filter(Boolean);

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_HASHTAG_REGEX.test(tag));

const hasValidCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsFieldElement,
  hasValidCount,
  TAG_ERROR_TEXTS.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagsFieldElement,
  hasUniqueTags,
  TAG_ERROR_TEXTS.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagsFieldElement,
  hasValidTags,
  TAG_ERROR_TEXTS.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator(
  commentFieldElement,
  hasValidCommentLength,
  COMMENT_ERROR_TEXT
);

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

export {
  validateForm,
  resetValidation,
};
