import { isEscapeKey } from './util.js';

const COMMENTS_PORTION_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('#picture-cancel');
const bodyElement = document.body;

let shownCommentsCount = 0;
let currentComments = [];

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imageElement = document.createElement('img');
  imageElement.classList.add('social__picture');
  imageElement.src = avatar;
  imageElement.alt = name;
  imageElement.width = 35;
  imageElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(imageElement, textElement);
  return commentElement;
};

const renderComments = () => {
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PORTION_COUNT
  );

  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });
  commentsListElement.append(fragment);

  shownCommentsCount += nextComments.length;

  commentShownCountElement.textContent = shownCommentsCount;
  commentTotalCountElement.textContent = currentComments.length;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const showBigPicture = (photo) => {
  bigPictureImageElement.src = photo.url;
  bigPictureImageElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;

  commentsListElement.innerHTML = '';
  shownCommentsCount = 0;
  currentComments = photo.comments;

  renderComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
