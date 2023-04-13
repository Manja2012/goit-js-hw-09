let changeColorId = null;

const bodyEl = document.querySelector(`body`);
const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);

startBtn.addEventListener(`click`, onStartBtnClick);
stopBtn.addEventListener(`click`, onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

 function onStartBtnClick(){
    changeColorId = setInterval(() => {
        bodyEl.style.setProperty(`background-color`, getRandomHexColor());
      }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
 } 
 function onStopBtnClick(){
    clearInterval(changeColorId);
    startBtn.disabled = false;
    stopBtn.disabled = true;


 } 
 