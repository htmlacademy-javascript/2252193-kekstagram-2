import {SERVER_URL} from './data.js';

const route = {
  GET_DATA: '/data',
  SEND_DATA:'/',
}

const method = {
  GET: 'GET',
  POST: 'POST',
}

const errorText = {
  [method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз.',
  [method.POST]: 'Не удалось отправить данные формы.',
}

const load = (route, method = method.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`,{method, body})
    .then((response) => response.ok ? response.json() : Promise.reject(errorText[method]));

const getData = () => load(route.GET_DATA);
const sendData = (body) => load(route.SEND_DATA, method.POST, body);

