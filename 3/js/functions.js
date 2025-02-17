// 1я функция

// function getStringLength(string, maxSymbols) {
//   const stringLength = string.length;
//   return stringLength <= maxSymbols;
// }

const getStringLength = (string, maxSymbols) => (string.length <= maxSymbols);

console.log(getStringLength('проверяемая строка', 20));
console.log(getStringLength('проверяемая строка', 18));
console.log(getStringLength('проверяемая строка', 10));

// 2я функция

// function isPalindrome (string) {
//   const stereotypedString = string.replaceAll(' ', '').toLowerCase();
//   let mirrorString = '';
//
//   for (let i = stereotypedString.length; i; i--) {
//     mirrorString += stereotypedString[i - 1];
//   }
//   return mirrorString === stereotypedString;
// }

/* или
let isPalindrome = (string) => {
  let stereotypedString = string.replaceAll(' ', '').toLowerCase();
  let mirrorString = stereotypedString.split('').reverse().join('');
  return mirrorString === stereotypedString;
}; */

/* или */

const isPalindromeByArrayMethod = (string) => {
  const stereotypedString = string.replaceAll(' ', '').toLowerCase();
  const mirrorString = [...stereotypedString].reverse().join('');
  return mirrorString === stereotypedString;
};

console.log(isPalindromeByArrayMethod('топот'));
console.log(isPalindromeByArrayMethod('ДовОд'));
console.log(isPalindromeByArrayMethod('Кекс'));
console.log(isPalindromeByArrayMethod('Лёша на полке клопа нашёл '));


// 3я функция
const extractNumbers = (newString) => {
  let result = '';
  const string = newString.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }
  return result === '' ? NaN : Number(result);
};

console.log(extractNumbers('2023 год'));
console.log(extractNumbers('ECMAScript 2022'));
console.log(extractNumbers('1 кефир, 0.5 батона'));
console.log(extractNumbers('агент 007'));
console.log(extractNumbers('а я томат'));
console.log(extractNumbers(2023));
console.log(extractNumbers(-1));
console.log(extractNumbers(1.5));
