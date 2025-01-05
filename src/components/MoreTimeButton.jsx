import { formatTime, unformatTime } from "../modules/functions";
export default function MoreTimeButton({ time, currentTimer, timerId, updateTime, updateCurrentTimer, startTimer }) {
    function addMoreTime(time) {
        const addedTime = unformatTime(currentTimer) + time;
        const formattedTime = formatTime(addedTime);
    
        if (timerId.current) { // checks if the timer is running
            clearInterval(timerId.current); // stops the timer
            timerId.current = null;
    
            updateTime(addedTime);

            startTimer();
        } else {
    
            updateTime(addedTime);
            updateCurrentTimer(formattedTime);
          
        }
    }

    function handleClick() {
        addMoreTime(time * 60);
    }


    return (
        <button onClick={handleClick}>+ {time} min</button>
    )
}