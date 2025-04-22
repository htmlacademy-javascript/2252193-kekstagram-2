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
  } catch (err) {
    shownToastError('Не удалось загрузить данные с сервера');
  }
};

const sendDataToServer = async (formData, onSuccess, onError) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  } catch (err) {
    onError();
  }
};

export { getDataFromServer, sendDataToServer };
