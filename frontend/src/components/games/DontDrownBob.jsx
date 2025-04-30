import { useEffect, useState, useRef } from "react";
import background from "../../asset/images/DontDrownBobBackground.png";
import bridge from "../../asset/images/bridge.png";
import logo from "../../asset/images/ddblogo.png";
import bob from "../../asset/images/bob2.png";
import Balloon from "./Balloon";
import Bob from "./Bob";
import { mainMusic, BobDrownsMusic } from "../../utils/bgMusic";

const DontDrownBob = ({ onScoreSubmission }) => {
    const answerRef = useRef(null);

    const [death, setDeath] = useState(false);
    const [start, setStart] = useState(true);
    const xaxis = ["20", "28", "36", "44", "52", "60", "68", "76"];
    const [originalXs] = useState([
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
    ]);
    const [originalYs] = useState([
        Math.floor(Math.random() * originalXs[0]),
        Math.floor(Math.random() * originalXs[1]),
        Math.floor(Math.random() * originalXs[2]),
        Math.floor(Math.random() * originalXs[3]),
        Math.floor(Math.random() * originalXs[4]),
        Math.floor(Math.random() * originalXs[5]),
        Math.floor(Math.random() * originalXs[6]),
        Math.floor(Math.random() * originalXs[7]),
    ]);
    const [bobOnBalloon, setBobOnBalloon] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        mainMusic.pause();
        BobDrownsMusic.currentTime = 0;
        BobDrownsMusic.play();
        return () => {
            BobDrownsMusic.pause();
            mainMusic.play();
        };
    }, []);

    useEffect(() => {
        if (!start && !death && !gameOver && answerRef.current) {
            answerRef.current.focus();
        }
    }, [start, death, gameOver, bobOnBalloon]);

    const handleGameOver = () => setGameOver(true);

    const handleClick = () => {
        if (!answerRef.current) return;
        const attempt = Number(answerRef.current.value.trim());
        const correct =
            originalXs[bobOnBalloon - 1] - originalYs[bobOnBalloon - 1];

        if (attempt === correct) {
            setBobOnBalloon((prev) => {
                const next = prev + 1;
                if (next === 9) setDeath(true);
                return next;
            });
            setScore((s) => s + 12.5);

            /* clear & refocus */
            answerRef.current.value = "";
            answerRef.current.focus();
        }
    };

    const submitScore = () => onScoreSubmission(Math.round(score));

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                position: "absolute",
                top: 0,
                left: 0,
                padding: "5%",
                boxSizing: "border-box",
                overflow: "hidden",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Bob (alive) */}
            {!start && !death && !gameOver && (
                <Bob
                    x={Number(xaxis[bobOnBalloon - 1]) - 5}
                    y="20"
                    nextX={Number(xaxis[bobOnBalloon - 1]) - 6}
                    nextY="20"
                />
            )}

            {/* Bridges */}
            <div
                style={{
                    backgroundImage: `url(${bridge})`,
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    bottom: "-85%",
                    left: "-15%",
                    height: "120%",
                    width: "100%",
                }}
            />
            <div
                style={{
                    backgroundImage: `url(${bridge})`,
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    bottom: "-85%",
                    left: "65%",
                    height: "120%",
                    width: "100%",
                }}
            />

            {/* Balloons */}
            {!start &&
                !death &&
                !gameOver &&
                [...Array(8)].map((_, i) => (
                    <Balloon
                        key={i}
                        id={`${i + 1}`}
                        left={xaxis[i]}
                        originalX={originalXs[i]}
                        originalY={originalYs[i]}
                        bobOnBalloon={bobOnBalloon}
                        gameOver={handleGameOver}
                    />
                ))}

            {/* Answer box */}
            {!gameOver && !death && (
                <input
                    id="answer"
                    ref={answerRef}
                    autoFocus
                    style={{
                        position: "absolute",
                        left: "43%",
                        bottom: "20%",
                        width: "19%",
                        height: "10%",
                        fontSize: "18px",
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleClick()}
                />
            )}

            {/* Send button */}
            {!gameOver && !death && (
                <button
                    style={{
                        position: "absolute",
                        left: "43%",
                        bottom: "15%",
                        width: "20%",
                        height: "5%",
                        fontSize: "13px",
                        backgroundColor: "pink",
                    }}
                    onClick={handleClick}
                >
                    SEND
                </button>
            )}

            {/* Death Screen */}
            {death && (
                <div
                    style={{
                        position: "absolute",
                        top: "35%",
                        left: "52%",
                        transform: "translate(-40%, -30%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        padding: "20px",
                        color: "white",
                        fontSize: "30px",
                    }}
                >
                    <h1>Victorious!</h1>
                    <p>Your score: {score}</p>
                    <button
                        style={{
                            marginTop: "5%",
                            padding: "4% 10%",
                            cursor: "pointer",
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.1s",
                        }}
                        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
                        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                        onClick={submitScore}
                    >
                        Continue
                    </button>
                </div>
            )}

            {/* Game-Over overlay & logo */}
            {gameOver && (
                <>
                    <div
                        style={{
                            backgroundImage: `url(${logo})`,
                            position: "absolute",
                            backgroundRepeat: "no-repeat",
                            scale: "60%",
                            height: "50%",
                            width: "90%",
                            left: "22%",
                            top: "-5%",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "35%",
                            left: "52%",
                            transform: "translate(-41%, -20%)",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            padding: "20px",
                            color: "white",
                            fontSize: "30px",
                        }}
                    >
                        <h1>Game Over</h1>
                        <p>Your score: {score}</p>
                        <p style={{ fontSize: "20px" }}>
                            Correct Answer for {originalXs[bobOnBalloon - 1]} -{" "}
                            {originalYs[bobOnBalloon - 1]} ={" "}
                            {originalXs[bobOnBalloon - 1] - originalYs[bobOnBalloon - 1]}
                        </p>
                        <button
                            style={{
                                marginTop: "5%",
                                padding: "4% 10%",
                                cursor: "pointer",
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "1rem",
                                boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                                transition: "transform 0.1s",
                            }}
                            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
                            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                            onClick={submitScore}
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}

            {/* Start Screen */}
            {start && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#A5B68D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative Bobs */}
                    <img
                        src={bob}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "5%",
                            height: "180px",
                            opacity: 0.6,
                        }}
                    />
                    <img
                        src={bob}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "10%",
                            right: "5%",
                            height: "180px",
                            opacity: 0.6,
                            transform: "scaleX(-1)",
                        }}
                    />

                    {/* Center Panel */}
                    <div
                        style={{
                            position: "relative",
                            width: "90%",
                            maxWidth: "700px",
                            padding: "2rem",
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: "12px",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                            textAlign: "center",
                        }}
                    >
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="Dont Drown Bob"
                            style={{
                                width: "60%",
                                maxWidth: "300px",
                                marginBottom: "1.5rem",
                            }}
                        />

                        {/* Instructions */}
                        <p
                            style={{
                                fontFamily: "Arial, sans-serif",
                                fontSize: "1.1rem",
                                color: "#333",
                                lineHeight: 1.4,
                                marginBottom: "2rem",
                            }}
                        >
                            Make sure BOB doesn’t drown! Jump from balloon to balloon by
                            quickly solving math problems. Bob’s on the hefty side, so speed is
                            key!
                        </p>

                        {/* Arrows */}
                        <div
                            style={{ marginTop: "1.5rem", fontSize: "2rem", color: "#4CAF50" }}
                        >
                            ⬇️⬇️⬇️
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={() => setStart(false)}
                            style={{
                                fontFamily: "Arial, sans-serif",
                                fontSize: "1.25rem",
                                padding: "0.75rem 2rem",
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#45A049")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#4CAF50")
                            }
                        >
                            START
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DontDrownBob;
