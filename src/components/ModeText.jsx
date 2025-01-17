export default function ModeText({ currentPhase }) {
    return (
        <section className="mode-container">
          <h2>{currentPhase === -1 ? "short break" :
            currentPhase === 0 ? "focus" :
            currentPhase === 1 ? "short break" :
            currentPhase === 2 ? "focus" :
            currentPhase === 3 ? "short break" :
            currentPhase === 4 ? "focus" :
            currentPhase === 5 ? "short break" :
            currentPhase === 6 ? "focus" : 
            currentPhase === 7 ? "long break" : "error"}</h2>
        </section>
    )
}