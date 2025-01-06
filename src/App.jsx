import { useState, useEffect, useRef } from 'react';
import { formatTime, unformatTime } from "./modules/functions";
import date from 'date-and-time';
import './App.css';
import MoreTimeButton from "./components/MoreTimeButton";
import ActionButtons from "./components/ActionButtons";

function App() {
// add a settings tab for the user to change the default times
  const now = new Date();
  let focusMode = 1500;
  let shortBreak = 300;
  let longBreak = 900;
  localStorage.getItem("timer");

  const [timeInSeconds, setTimeInSeconds] = useState(() => {
    return localStorage.getItem("timer") ? [JSON.parse(localStorage.getItem("timer")), JSON.parse(localStorage.getItem("phase"))] : [focusMode, 0]});
  const [currentTimer, setCurrentTimer] = useState([formatTime(timeInSeconds[0]), focusMode]);
  const timerId = useRef(null); // Use useRef to store timer ID
  const moreTimeButtonArray = ["25", "10", "5", "1"];
  let isTimerRunning = useRef(false);
  let isFirstTimer = useRef(true);

  const currentPhase = timeInSeconds[1];



  function startTimer() {
    if (timerId.current) return; // allows only one timer
    setCurrentTimer(prevState => [prevState[0], timeInSeconds[0]]);
    timerId.current = setInterval(() => {
      setTimeInSeconds(prevTime => {
        if (prevTime[0] === 0) {

          return [
            prevTime[1] === -1 ? focusMode :
            prevTime[1] === 0 ? shortBreak :
            prevTime[1] === 1 ? focusMode :
            prevTime[1] === 2 ? shortBreak :
            prevTime[1] === 3 ? focusMode :
            prevTime[1] === 4 ? shortBreak :
            prevTime[1] === 5 ? focusMode :
            prevTime[1] === 6 ? longBreak : 
            prevTime[1] === 7 ? focusMode : 300, prevTime[1] === 7 ? prevTime[1] = -1 : prevTime[1] + 1];
        }
        return [prevTime[0] - 1, prevTime[1]];
      });

    }, 1000);
  }
  

  let valueFromChild = '';
  let maxValue = currentTimer[1];

  const handleMaxTime = (value) => {
    setCurrentTimer(prevState => [prevState[0], value]);
    maxValue = value;
  };

  const headerText = () => {
    const hour = date.format(now, 'H')
    if (hour >= 0 && hour <= 5) {
      return " Good madrugada!"
    } else if (hour >= 6 && hour <= 11) {
      return " Good morning!"
    } else if (hour >= 12 && hour <= 17) {
      return " Good afternoon!"
    } else if (hour >= 18 && hour <= 23) {
      return " Good night!"
    }
  }

// not working yet
  let darkMode = true;
  // const darkMode = () => {
  //   return localStorage.getItem("mode") ? [JSON.parse(localStorage.getItem("timer")), JSON.parse(localStorage.getItem("phase"))] : [focusMode, 0]};

  function toggleDayNightMode() {
    console.log("toggled")
    darkMode ? darkMode = false : darkMode = true
    console.log(darkMode)
  }

  useEffect(() => {
    setCurrentTimer(prevState => [formatTime(timeInSeconds[0]), prevState[1]]);
    localStorage.setItem('timer', JSON.stringify(timeInSeconds[0]));
    localStorage.setItem('phase', JSON.stringify(timeInSeconds[1]));
  }, [timeInSeconds[0]]);
  return (
    <>
      <header>
        <p>{date.format(now, 'dddd, D MMM hh:mm A.') + headerText()}</p>
        <button onClick={toggleDayNightMode}>
          <img src="sun.svg" alt="" />
        </button>
      </header>
      <main className={darkMode ? "dark-mode" : "light-mode"}>
        <section className="mode-container">
          <h2>{timeInSeconds[1] === -1 ? "short break" :
            timeInSeconds[1] === 0 ? "focus" :
            timeInSeconds[1] === 1 ? "short break" :
            timeInSeconds[1] === 2 ? "focus" :
            timeInSeconds[1] === 3 ? "short break" :
            timeInSeconds[1] === 4 ? "focus" :
            timeInSeconds[1] === 5 ? "short break" :
            timeInSeconds[1] === 6 ? "focus" : 
            timeInSeconds[1] === 7 ? "long break" : "error"}</h2>
        </section>
        <section className="time-container">
          <label className={darkMode ? "dark-mode" : "light-mode"} htmlFor="countdown">{currentTimer[0]}</label>
          <progress id="countdown" value={(maxValue - timeInSeconds[0]) / maxValue} />
        </section>
        <section className="additional-time-container">
          {moreTimeButtonArray.map(button => {
            return (
              < MoreTimeButton time={button} 
                currentTimer={currentTimer}
                timerId={timerId}
                updateTime={setTimeInSeconds}
                updateCurrentTimer={setCurrentTimer}
                startTimer={startTimer}
                key={button}
                currentPhase={currentPhase}
                handleMaxTime={handleMaxTime}
              />
            )
          })}
        </section>
        <section className="action-container">
          < ActionButtons 
            currentTimer={currentTimer}
            timerId={timerId}
            updateTime={setTimeInSeconds}
            updateCurrentTimer={setCurrentTimer}
            isFirstTimer={isFirstTimer}
            isTimerRunning={isTimerRunning}
            startTimer={startTimer}
            currentPhase={currentPhase}
            handleMaxTime={handleMaxTime}
          />
        </section>
      </main>
    </>
  );
}

export default App
