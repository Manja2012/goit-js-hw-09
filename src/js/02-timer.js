import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputTimerId = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);
const dataDays = document.querySelector(`[data-days]`);
const dataHours = document.querySelector(`[data-hours]`);
const dataMinutes = document.querySelector(`[data-minutes]`);
const dataSeconds = document.querySelector(`[data-seconds]`);

let intervalId = null;
let deltaTime = null;

startBtn.addEventListener(`click`, onTimerStart);

startBtn.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() {
      clearInterval(intervalId);
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
    },
    onClose(selectedDates) {
      let timeDifferece = selectedDates[0].getTime() - new Date().getTime();
      if(timeDifferece > 0){
        startBtn.disabled = false;
      } else{
        Notiflix.Notify.warning('Please choose a date in the futur');
        startBtn.disabled = true;
      }
    },
  };

  let data = flatpickr(inputTimerId, options);

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };

  }
  
  function addLeadingZero(number){
  return String(number).padStart(2, '0');
 }

function onTimerStart(){
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    deltaTime = data.selectedDates[0].getTime() - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if(deltaTime <= 0){
      clearInterval(intervalId);
      
    }
    showTimerOnScreen(convertMs(deltaTime));
  }, 1000);
startBtn.disabled = true;
}

function showTimerOnScreen({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}