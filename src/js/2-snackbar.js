// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  delayField: document.querySelector('input[name="delay"]'),
  stateField: document.querySelectorAll('input[name="state"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let message;
      if (state === 'fulfilled') {
        message = `✅ Fulfilled promise in ${delay}ms`;
        resolve(message);
      } else {
        message = `❌ Rejected promise in ${delay}ms`;
        reject(message);
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const delay = Number(refs.delayField.value);
  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const state = selectedRadio?.value;

  if (!state) {
    iziToast.error({
      message: 'Please select a state',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then(message => {
      iziToast.success({
        message,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(message => {
      iziToast.error({
        message,
        position: 'topRight',
        timeout: 3000,
      });
    });

  event.target.reset();
}
