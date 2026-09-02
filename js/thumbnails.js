import { showBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const containerElement = document.querySelector('.pictures');

let photos = [];

const onContainerClick = (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if (!thumbnailElement) {
    return;
  }

  evt.preventDefault();
  thumbnailElement.blur();
  const pictureId = Number(thumbnailElement.dataset.pictureId);
  const photo = photos.find((item) => item.id === pictureId);
  if (photo) {
    showBigPicture(photo);
  }
};

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');

  pictureElement.dataset.pictureId = id;
  imageElement.src = url;
  imageElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  photos = pictures;
  containerElement.querySelectorAll('.picture').forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragment.append(thumbnailElement);
  });

  containerElement.append(fragment);
};

containerElement.addEventListener('click', onContainerClick);

export { renderThumbnails };
