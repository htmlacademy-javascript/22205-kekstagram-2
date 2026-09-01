// Функция для проверки длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


// Функция для проверки на палиндром
const isPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');

  for (let i = 0; i < normalizedString.length / 2; i++) {
    if (normalizedString[i] !== normalizedString[normalizedString.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');


// Функция для извлечения цифр
const RADIX = 10;

const extractDigits = (input) => {
  const string = input.toString();
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    const parsedDigit = parseInt(string[i], RADIX);

    if (!Number.isNaN(parsedDigit)) {
      digits += string[i];
    }
  }

  return parseInt(digits, RADIX);
};

extractDigits('2023 год');
extractDigits('ECMAScript 2022');
extractDigits('1 кефир, 0.5 батона');
extractDigits('агент 007');
extractDigits('а я томат');
extractDigits(2023);
extractDigits(-1);
extractDigits(1.5);
