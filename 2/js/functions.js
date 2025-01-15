// 1я функция

function getStringLength(string, length) {
  let stringLength = string.length;
  return stringLength <= length;
}

console.log(getStringLength('Маша ела кашу', 20));


// 2я функция

function isPalindrome (string) {
  let newString = string.replaceAll(' ', '').toLowerCase();
  let mirrorString = '';

  for (let i = newString.length; i; i--) {
    mirrorString += newString[i - 1];
  }
  return mirrorString === newString;
}

/* или
let isPalindrome = (string) => {
  let newString = string.replaceAll(' ', '').toLowerCase();
  let mirrorString = newString.split('').reverse().join('');
  return mirrorString === newString;
}*/

console.log(isPalindrome('Лёша на полке клопа нашёл '));


//3я функция
const extractNumbers = (newString) => {
  let result = '';
  let string = newString.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

console.log(extractNumbers('fASFS234YSDA5'));
