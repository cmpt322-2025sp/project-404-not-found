import React, { useState } from 'react'

const TestGame = ({ onScoreSubmission }) => {
    const [score, setScore] = useState(0)
    const [gameCompleted, setGameCompleted] = useState(false)

    const incrementScore = () => {
        setScore(score + 10)
    }

    const decrementScore = () => {
        setScore(score - 10)
    }

    const endGame = () => {
        setGameCompleted(true)
    }

    const submitScore = () => {
        onScoreSubmission(score)
    }

    return (
        <div>
            {!gameCompleted ? (
                <>
                    <h1>This is Test Game</h1>
                    <div className="score">
                        <p>Score: {score}</p>
                    </div>
                    <div>
                        <button onClick={incrementScore}>+</button>
                        <button onClick={decrementScore}>-</button>
                    </div>
                    <button onClick={endGame}>Done</button>
                </>
            ) : (
                <div>
                    <h1>Game Completed!</h1>
                    <button onClick={submitScore}>Submit Score</button>
                </div>
            )}
        </div>
    )
}

export default TestGame