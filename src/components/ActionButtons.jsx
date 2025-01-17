import { useRef } from "react";
import { formatTime, unformatTime } from "../modules/functions";
export default function ActionButtons({ handleMaxTime, currentPhase, startTimer, isFirstTimer, isTimerRunning, currentTimer, timerId, updateTime, updateCurrentTimer }) {
    const buttonRef = useRef(null)
    const passMaxTime = (addedTime) => {
        const maxTime = addedTime;
        handleMaxTime(maxTime);
    };

    function resetTimer() {
        passMaxTime(1500)
        if (timerId.current) {
            clearInterval(timerId.current);
            timerId.current = null;
            updateTime([1500, 0]);
            updateCurrentTimer(prevState => [formatTime(1500), 0]);
            buttonRef.current.textContent = "Start";
            isTimerRunning.current = false;
        } else {
            updateTime([1500, 0]);
            updateCurrentTimer(prevState => [formatTime(1500), 0]);
            buttonRef.current.textContent = "Start";
            isTimerRunning.current = false;
        }
    }

    function pauseTimer() {
        console.log(isFirstTimer.current)
        if (isFirstTimer.current) {
            // change from start to pause
            buttonRef.current.textContent = "Pause";
            isFirstTimer.current = false;
            isTimerRunning.current = true;
            startTimer();
        } else if (isTimerRunning.current) {
            // if it is running, pause it
            buttonRef.current.textContent = "Resume";
            isTimerRunning.current = false;
            if (timerId.current) {
                clearInterval(timerId.current);
                timerId.current = null;
                updateTime([unformatTime(currentTimer[0]), currentPhase]);
            }
        } else {
            // as it isn't running, resume timer
            buttonRef.current.textContent = "Pause";
            isTimerRunning.current = true;
            startTimer();
        }
    }
    
    return (
        <>
            <button ref={buttonRef} onClick={() => pauseTimer(0)}>Start</button>
            <button onClick={resetTimer} className="reset">Reset</button>
        </>
    )
}