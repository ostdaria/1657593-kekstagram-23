const getData = (onSuccess, onError) => fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((err) => {
    onError(err);
  });


const sendData = (onSuccess, onError, body) =>
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });

export {getData, sendData};
