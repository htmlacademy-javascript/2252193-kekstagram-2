// функция для рандомного числа из диапазона.
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  // Исключаем повторение значения в след вызовах для коментариев
  return result === upper ? lower : result + 1; // подставляем следующий
};

export {getRandomInteger};
