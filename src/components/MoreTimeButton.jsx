import { formatTime, unformatTime } from "../modules/functions";
export default function MoreTimeButton({ handleMaxTime, currentPhase, time, currentTimer, timerId, updateTime, updateCurrentTimer, startTimer }) {
    const passMaxTime = (addedTime) => {
        const maxTime = addedTime;
        handleMaxTime(maxTime);
    };


    function addMoreTime(time) {
        const addedTime = unformatTime(currentTimer[0]) + time;
        const formattedTime = formatTime(addedTime);
        
        
        passMaxTime(addedTime);


        if (timerId.current) { // checks if the timer is running
            clearInterval(timerId.current); // stops the timer
            timerId.current = null;
    
            updateTime([addedTime, currentPhase]);
            updateCurrentTimer(prevState => [prevState[0], addedTime]);

            startTimer();
        } else {
    
            updateTime([addedTime, currentPhase]);
            updateCurrentTimer([formattedTime, addedTime]);
          
        }
    }

    function handleClick() {
        addMoreTime(time * 60);
    }


    return (
        <button onClick={handleClick}>+ {time} min</button>
    )
}