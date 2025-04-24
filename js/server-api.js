import { shownToastError } from './message-upload-popup.js';
import URLS from './endpoints.js';

const getDataFromServer = (onSuccess) => {
  fetch(URLS.DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      shownToastError('Не удалось загрузить данные с сервера');
    });
};

const sendDataToServer = (formData, onSuccess, onError) => {
  fetch(
    URLS.API_URL,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => onError());
};

export { getDataFromServer, sendDataToServer };
