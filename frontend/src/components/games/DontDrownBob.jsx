import { useEffect, useState, useRef } from "react";
import background from "../../asset/images/DontDrownBobBackground.png";
import bridge from "../../asset/images/bridge.png";
import logo from "../../asset/images/ddblogo.png";
import bob from "../../asset/images/bob2.png";
import Balloon from "./Balloon";
import Bob from "./Bob";
import { mainMusic, BobDrownsMusic } from "../../utils/bgMusic";
import successSoundFile from "../../asset/sounds/success.mp3";
import failSoundFile from "../../asset/sounds/fail.wav";
import startSound from "../../asset/sounds/gameStart.mp3";

const DontDrownBob = ({ onScoreSubmission }) => {

    const playOneShot = (src, volume = 1) => {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(() => {});
    };
    /* ─────────────────────────── refs for audio ────────────────────────── */
    const answerRef = useRef(null);
    const successAudioRef = useRef(null);
    const failAudioRef = useRef(null);
    const startAudioRef = useRef(null);

    /* ─────────────────────────── state ─────────────────────────────────── */
    const [death, setDeath] = useState(false);
    const [start, setStart] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const xaxis = ["20", "28", "36", "44", "52", "60", "68", "76"];
    const [originalXs] = useState(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 11))
    );
    const [originalYs] = useState(
        originalXs.map((x) => Math.floor(Math.random() * x))
    );

    const [bobOnBalloon, setBobOnBalloon] = useState(1);
    const [score, setScore] = useState(0);

    /* ────────────────────────── music hand-off ─────────────────────────── */
    useEffect(() => {
        mainMusic.pause();
        BobDrownsMusic.currentTime = 0;
        BobDrownsMusic.play();
        return () => {
            BobDrownsMusic.pause();
            mainMusic.play();
        };
    }, []);

    /* focus the input whenever needed */
    useEffect(() => {
        if (!start && !death && !gameOver) answerRef.current?.focus();
    }, [start, death, gameOver, bobOnBalloon]);

    /* ─────────────────────── answer submission ─────────────────────────── */
    const handleClick = () => {
        if (!answerRef.current) return;

        const attempt = Number(answerRef.current.value.trim());
        const correct = originalXs[bobOnBalloon - 1] - originalYs[bobOnBalloon - 1];

        if (attempt === correct) {
            /* ✓ right answer */
            successAudioRef.current?.play().catch(() => { });
            playOneShot(successSoundFile);

            setBobOnBalloon((prev) => {
                const next = prev + 1;
                if (next === 9) setDeath(true);         // reached last balloon
                return next;
            });
            setScore((s) => s + 12.5);
        } else {
            /* ✗ wrong answer */
            failAudioRef.current?.play().catch(() => { });
            playOneShot(failSoundFile);
        }

        /* clear & refocus the input regardless */
        answerRef.current.value = "";
        answerRef.current.focus();
    };

    /* finish */
    const submitScore = () => onScoreSubmission(Math.round(score));

    /* ─────────────────────────── UI ────────────────────────────────────── */
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                position: "absolute",
                inset: 0,
                padding: "5%",
                boxSizing: "border-box",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Bob */}
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
            {!start && !death && !gameOver &&
                [...Array(8)].map((_, i) => (
                    <Balloon
                        key={i}
                        id={`${i + 1}`}
                        left={xaxis[i]}
                        originalX={originalXs[i]}
                        originalY={originalYs[i]}
                        bobOnBalloon={bobOnBalloon}
                        gameOver={() => setGameOver(true)}
                    />
                ))}

            {/* Input box */}
            {!gameOver && !death && (
                <input
                    ref={answerRef}
                    autoFocus
                    style={{
                        position: "absolute",
                        left: "38%",
                        bottom: "20%",
                        width: "19%",
                        height: "10%",
                        fontSize: "18px",
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleClick()}
                />
            )}

            {/* Number's pad */}
            {!gameOver && !death && (
            <div
                style={{
                position: "absolute",
                bottom: "5%",
                left: "58%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.3%",
                width: "10%",
                }}
            >
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←"].map((key) => (
                <button
                    key={key}
                    onClick={() => {
                    if (!answerRef.current) return;
                    if (key === "←") {
                        answerRef.current.value = answerRef.current.value.slice(0, -1);
                    } else {
                        answerRef.current.value += key;
                    }
                    }}
                    style={{
                    width: "100%",
                    aspectRatio: "1",
                    fontSize: "1.2rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#547792",
                    color: "white",
                    border: "2px solid white",
                    cursor: "pointer",
                    }}
                >
                    {key}
                </button>
                ))}
            </div>
            )}


            {/* Send button */}
            {!gameOver && !death && (
                <button
                    style={{
                        position: "absolute",
                        left: "37.8%",
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

            {/* --------- VICTORY (death == true because Bob reached shore) -------- */}
            {death && (
                <div style={overlayStyle}>
                    <h1>Victorious!</h1>
                    <p>Your score: {score}</p>
                    <button
                        style={btnStyle}
                        onClick={() => {
                            startAudioRef.current?.play().catch(() => { });
                            setTimeout(submitScore, 800);
                        }}
                    >
                        Continue
                    </button>
                </div>
            )}

            {/* --------- GAME OVER (fell) --------------------------------------- */}
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
                    <div style={{ ...overlayStyle, top: "35%" }}>
                        <h1>Game Over</h1>
                        <p>Your score: {score}</p>
                        <p style={{ fontSize: 20 }}>
                            Correct Answer for&nbsp;
                            {originalXs[bobOnBalloon - 1]} - {originalYs[bobOnBalloon - 1]} =
                            {originalXs[bobOnBalloon - 1] - originalYs[bobOnBalloon - 1]}
                        </p>
                        <button
                            style={btnStyle}
                            onClick={() => {
                                startAudioRef.current?.play().catch(() => { });
                                setTimeout(submitScore, 800);
                            }}
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
                        inset: 0,
                        backgroundColor: "#A5B68D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* decorative bobs */}
                    <img src={bob} alt="" style={{ position: "absolute", top: "10%", left: "5%", height: 180, opacity: 0.6 }} />
                    <img src={bob} alt="" style={{ position: "absolute", top: "10%", right: "5%", height: 180, opacity: 0.6, transform: "scaleX(-1)" }} />

                    {/* panel */}
                    <div style={panelStyle}>
                        <img src={logo} alt="Dont Drown Bob" style={{ width: "60%", maxWidth: 300, marginBottom: "1.5rem" }} />
                        <p style={instrStyle}>
                            Make sure BOB doesn’t drown! Jump from balloon to balloon by
                            quickly solving math problems. Bob’s on the hefty side, so speed is
                            key!
                        </p>
                        <div style={{ marginTop: "1.5rem", fontSize: "2rem", color: "#4CAF50" }}>⬇️⬇️⬇️</div>
                        <button
                            onClick={() => {
                                startAudioRef.current?.play().catch(() => { });
                                setTimeout(() => setStart(false), 600);
                            }}
                            style={startBtn}
                        >
                            START
                        </button>
                    </div>
                </div>
            )}

            {/* hidden audio elements */}
            <audio ref={successAudioRef} src={successSoundFile} />
            <audio ref={failAudioRef} src={failSoundFile} />
            <audio ref={startAudioRef} src={startSound} />
        </div>
    );
};

/* ---------------------------- styles ---------------------------------- */
const overlayStyle = {
    position: "absolute",
    top: "35%",
    left: "52%",
    transform: "translate(-40%, -30%)",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
};

const btnStyle = {
    marginTop: "5%",
    padding: "4% 10%",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: "1rem",
    boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
};

const panelStyle = {
    position: "relative",
    width: "90%",
    maxWidth: 700,
    padding: "2rem",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
};

const instrStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "1.1rem",
    color: "#333",
    lineHeight: 1.4,
    marginBottom: "2rem",
};

const startBtn = {
    fontFamily: "Arial, sans-serif",
    fontSize: "1.25rem",
    padding: "0.75rem 2rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
};

export default DontDrownBob;
