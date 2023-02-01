import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      Notiflix.Notify.success('Sol lucet omnibus');
      btnStart.disabled = false;
    }
  },
};
flatpickr(inputData, options);

// ________________________________________________________________
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(new Date()))

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// ----------------------------------------------------------

btnStart.addEventListener('click', timeRunOut);

function timeRunOut() {
  let timer = setInterval(() => {
    let countdown = new Date(inputData.value) - Date.now();
    let timeObject = convertMs(countdown);
    if (countdown >= 0) {
      dataDays.textContent = addLeadingZero(timeObject.days);
      dataHours.textContent = addLeadingZero(timeObject.hours);
      dataMinutes.textContent = addLeadingZero(timeObject.minutes);
      dataSeconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      clearInterval(timer);
    }
  }, 1000);
}
