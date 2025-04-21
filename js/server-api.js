import { shownToastError } from './message-upload-popup.js';
import { API_URL } from './endpoints.js';

const getDataFromServer = async (onSuccess) => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const posts = await response.json();
    onSuccess(posts);
  } catch (error) {
    shownToastError('Не удалось загрузить данные с сервера');
  }
};

const sendDataToServer = (formData, onSuccess, onError) => {
  fetch(
    API_URL,
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
    .catch(() => onError);
};

export { getDataFromServer, sendDataToServer };
