import { useState, useEffect, useRef } from 'react';
import { formatTime } from "./modules/functions";
import './App.css';
import ModeText from "./components/ModeText";
import MoreTimeButton from "./components/MoreTimeButton";
import ActionButtons from "./components/ActionButtons";
import Header from './components/Header';

function App() {
  let finishedAudio = new Audio("drum-sound1.mp3");

// add a settings tab for the user to change the default times
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
          finishedAudio.play()
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
  
  let maxValue = currentTimer[1];

  const handleMaxTime = (value) => {
    setCurrentTimer(prevState => [prevState[0], value]);
    maxValue = value;
  };

  useEffect(() => {
    setCurrentTimer(prevState => [formatTime(timeInSeconds[0]), prevState[1]]);
    localStorage.setItem('timer', JSON.stringify(timeInSeconds[0]));
    localStorage.setItem('phase', JSON.stringify(timeInSeconds[1]));
  }, [timeInSeconds[0]]);

  return (
    <main id="main">
      <Header />
      <section className="app-main">
        <ModeText currentPhase={currentPhase}/>
        <section className="time-container">
          <label htmlFor="countdown">{currentTimer[0]}</label>
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
  );
}

export default App
