import { useState, useEffect, useRef } from 'react';
import { formatTime, unformatTime } from "./modules/functions";
import date from 'date-and-time';
import './App.css';
import MoreTimeButton from "./components/MoreTimeButton";
import ActionButtons from "./components/ActionButtons";

function App() {

  const [timeInSeconds, setTimeInSeconds] = useState(1500);
  const [currentTimer, setCurrentTimer] = useState(formatTime(timeInSeconds));
  const timerId = useRef(null); // Use useRef to store timer ID
  const moreTimeButtonArray = ["25", "10", "5", "1"];
  let isTimerRunning = useRef(false);
  let isFirstTimer = useRef(true);

  function startTimer() {
    if (timerId.current) return; // allows only one timer

    timerId.current = setInterval(() => {
      setTimeInSeconds(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId.current);
          timerId.current = null;
          return 0; // agregar los otros estados
        }
        return prevTime - 1;
      });

    }, 1000);
  }
  

  useEffect(() => {
    setCurrentTimer(formatTime(timeInSeconds));
  }, [timeInSeconds]);
  return (
    <>
      <header>
        <p>this is the header</p>
      </header>
      <main>
        <section className="mode-container">
          <button>Focus</button>
          <button>Short Break</button>
          <button>Long Break</button>
        </section>
        <section className="time-container">
          <h1>{currentTimer}</h1>
          <p>// status bar //</p>
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
          />
        </section>
      </main>
    </>
  );
}

export default App
