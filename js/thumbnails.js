const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const containerElement = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');

  imageElement.src = url;
  imageElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragment.append(thumbnailElement);
  });

  containerElement.append(fragment);
};

export { renderThumbnails };
