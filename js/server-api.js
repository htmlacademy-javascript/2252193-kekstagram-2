import { showAlertMessage } from './message-upload-popup.js';
import { API_URL } from './endpoints.js';

// const getDataFromServer = (onSuccess) => {
//   fetch(`${API_URL}/data`)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(`${response.status} ${response.statusText}`);
//     })
//     .then((posts) => {
//       onSuccess(posts);
//     })
//     .catch(() => {
//       showAlertMessage('Не удалось загрузить данные с сервера');
//     });
// };

const getDataFromServer = async (onSuccess) => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const posts = await response.json();
    onSuccess(posts);
  } catch (error) {
    showAlertMessage('Не удалось загрузить данные с сервера');
    console.error(error);
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
    .catch(() => onError());
};

export { getDataFromServer, sendDataToServer };
