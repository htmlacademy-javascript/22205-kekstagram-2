import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('#picture-cancel');
const bodyElement = document.body;

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

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });

  commentsListElement.append(fragment);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
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
  commentShownCountElement.textContent = photo.comments.length;
  commentTotalCountElement.textContent = photo.comments.length;
  socialCaptionElement.textContent = photo.description;

  renderComments(photo.comments);

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
