const URL_GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {fetch(URL_GET_DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then(onSuccess)
  .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(URL_SEND_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};


export {getData, sendData};
