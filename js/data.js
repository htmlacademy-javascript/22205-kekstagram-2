import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator,
} from './util.js';

const DESCRIPTIONS = [
  'Закат на берегу океана - идеальное завершение дня.',
  'Утренний кофе и любимая книга в тишине.',
  'Прогулка по атмосферным улочкам старого города.',
  'Выходные на природе в отличной компании.',
  'Мой пушистый четвероногий друг позирует для фото.',
  'Кулинарные эксперименты удались на славу!',
  'Горы зовут тех, чья душа им по росту.',
  'Маленькие радости каждого дня.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Станислав',
  'Ольга',
  'Иван',
  'Мария',
  'Дмитрий',
  'Екатерина',
  'Алексей',
  'София',
  'Михаил',
  'Анна',
];

const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;

const LikeCount = {
  MIN: 15,
  MAX: 200,
};

const CommentCount = {
  MIN: 0,
  MAX: 30,
};

const CommentLinesCount = {
  MIN: 1,
  MAX: 2,
};

const getCommentId = createIdGenerator();

const createMessage = () => {
  const messageLinesCount = getRandomInteger(CommentLinesCount.MIN, CommentLinesCount.MAX);
  const messageLines = Array.from({ length: messageLinesCount }, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(messageLines)).join(' ');
};

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (_, index) => {
  const id = index + 1;
  const commentsCount = getRandomInteger(CommentCount.MIN, CommentCount.MAX);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikeCount.MIN, LikeCount.MAX),
    comments: Array.from({ length: commentsCount }, createComment),
  };
};

const getPhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);

export { getPhotos };
