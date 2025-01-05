export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

export function unformatTime(timer) {
    const mins = Number(timer.slice(0, 2));
    const secs = Number(timer.slice(3));
    return mins * 60 + secs;
}