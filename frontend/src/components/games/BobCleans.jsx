import React, { useRef, useState, useEffect } from "react";
import Background from "../../asset/images/toys_bg.png";

// music
import { mainMusic, BobCleansMusic } from "../../utils/bgMusic";

import start from "../../asset/sounds/gameStart.mp3";
import successSoundFile from "../../asset/sounds/success.mp3";
import failSoundFile from "../../asset/sounds/fail.wav";
// Import your 15 toy images:
import Alien from "../../asset/images/toys/Alien.png";
import Doll from "../../asset/images/toys/Doll.png";
import Bear from "../../asset/images/toys/Bear.png";
import Buzz from "../../asset/images/toys/Buzz.png";
import Car from "../../asset/images/toys/Car.png";
import Train from "../../asset/images/toys/Train.png";
import Console from "../../asset/images/toys/Console.png";
import Xylophone from "../../asset/images/toys/Xylophone.png";
import Dinosaur from "../../asset/images/toys/Dinosaur.png";
import Plane from "../../asset/images/toys/Plane.png";
import Piano from "../../asset/images/toys/Piano.png";
import Robot from "../../asset/images/toys/Robot.png";
import Unicorn from "../../asset/images/toys/Unicorn.png";
import Duck from "../../asset/images/toys/Duck.png";
import Soccerball from "../../asset/images/toys/Soccerball.png";

/**
 * In one file:
 * 1) BobCleans: top‑level containing instructions => game flow
 * 2) InstructionsPage
 * 3) The actual game: ToyBoxPlaceValues
 *
 * NOTE: All absolute pixel‑based sizes were converted to viewport‑relative
 * percentages (vw/vh or %). Small decorative values such as box‑shadow and
 * border‑radius remain in pixels for consistent styling across devices.
 */

// 15 unique toys
const toyAssets = [
  { name: "Alien", src: Alien },
  { name: "Doll", src: Doll },
  { name: "Bear", src: Bear },
  { name: "Buzz Lightyear", src: Buzz },
  { name: "Car", src: Car },
  { name: "Train", src: Train },
  { name: "Game Console", src: Console },
  { name: "Xylophone", src: Xylophone },
  { name: "Dinosaur", src: Dinosaur },
  { name: "Plane", src: Plane },
  { name: "Piano", src: Piano },
  { name: "Robot", src: Robot },
  { name: "Unicorn", src: Unicorn },
  { name: "Duck", src: Duck },
  { name: "Soccerball", src: Soccerball },
];

// ====== TOP‑LEVEL COMPONENT ======
export default function BobCleans({
  onScoreSubmission = () => {}, // fallback if no parent prop is passed
}) {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    mainMusic.pause(); // pause big‑world loop
    BobCleansMusic.currentTime = 0; // rewind
    BobCleansMusic.play(); // start grocery loop

    return () => {
      BobCleansMusic.pause();
      mainMusic.play();
    };
  }, []);

  function handleStart() {
    setShowInstructions(false);
  }

  return (
    <div style={{ fontFamily: "'Comic Sans MS', cursive" }}>
      {showInstructions ? (
        <InstructionsPage onStart={handleStart} />
      ) : (
        <ToyBoxPlaceValues
          onScoreSubmission={(grade) => {
            onScoreSubmission(grade);
            setShowInstructions(true);
          }}
        />
      )}
    </div>
  );
}

// ====== 1) INSTRUCTIONS ======
function InstructionsPage({ onStart }) {
  const startAudioRef = useRef(null);

  const handleStartClick = () => {
    startAudioRef.current?.play().catch(console.warn);
    setTimeout(onStart, 800); // allow sound to play
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            fontFamily: "'Comic Sans MS', cursive",
            margin: 0,
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              position: "absolute",
              width: "26%",
              fontSize: "1.7vh",
              top: "22%",
              left: "38.9%",
              textAlign: "center",
            }}
          >
            <strong style={{ fontSize: "2.1vh" }}>How to Play</strong>
          </p>
          <p
            style={{
              position: "absolute",
              width: "26%",
              fontSize: "1.7vh",
              top: "27.5%",
              left: "39.2%",
              textAlign: "left",
            }}
          >
            - You have 15 unique toys, each labeled with a random number.
            <br />- Decide if the number belongs in the <em>1s box</em>, the
            <em>10s box</em>, or the <em>100s box</em>.
            <br />- Each correct answer scores 100 points!
            <br />- After all 15 toys are placed, you'll see your final score
            and grade.
          </p>
          <button
            onClick={handleStartClick}
            style={{
              position: "absolute",
              top: "61%",
              left: "47.8%",
              padding: "0.8% 4%",
              fontSize: "2.7vh",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "7%",
              cursor: "pointer",
            }}
          >
            Start
          </button>
        </div>
      </div>
      <audio ref={startAudioRef} src={start} />
    </>
  );
}

// ====== 2) GAME LOGIC ======
function ToyBoxPlaceValues({ onScoreSubmission }) {
  const [toyQuestions] = useState(generateToyQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [toyX, setToyX] = useState("52%");
  const [toyY, setToyY] = useState("45%");

  const gameOver = currentIndex >= toyQuestions.length;

  const successAudioRef = useRef(null);
  const failAudioRef = useRef(null);
  const startSoundRef = useRef(null);

  function submitScore() {
    const grade = Math.round((score / 1500) * 100);
    onScoreSubmission(grade);
  }

  function handleBoxClick(boxType) {
    if (gameOver) return;

    const { toyNumber } = toyQuestions[currentIndex];
    const correctBox = determineCorrectBox(toyNumber);

    let targetX = "0%";
    let targetY = "0%";

    if (boxType === "ones") {
      targetX = "30%";
      targetY = "65%"; // 400px ≈ 55vh
    } else if (boxType === "tens") {
      targetX = "55%";
      targetY = "65%"; // 300px ≈ 42vh
    } else if (boxType === "hundreds") {
      targetX = "77%";
      targetY = "65%"; // 350px ≈ 48vh
    }

    setToyX(targetX);
    setToyY(targetY);

    if (boxType === correctBox) {
      setScore((prev) => prev + 100);
      setFeedback("Correct!");
      successAudioRef.current &&
        setTimeout(() => {
          successAudioRef.current.currentTime = 0;
          successAudioRef.current.play();
        }, 400);
    } else {
      setFeedback("Wrong!");
      failAudioRef.current &&
        setTimeout(() => {
          failAudioRef.current.currentTime = 0;
          failAudioRef.current.play();
        }, 400);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setToyX("52%");
      setToyY("45%");
      setFeedback("");
    }, 1000);
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        fontFamily: "'Comic Sans MS', cursive",
        margin: 0,
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <audio ref={successAudioRef} src={successSoundFile} />
      <audio ref={failAudioRef} src={failSoundFile} />
      <audio ref={startSoundRef} src={start} />

      <div
        style={{ position: "absolute", top: "2.2%", width: "100%", textAlign: "center" }}
      >
        {gameOver ? (
          <div
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              fontSize: "2.5vh",
              position: "fixed",
              top: "27.4%",
              left: "39.5%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p>All 15 toys have been placed!</p>
            <p style={{ fontSize: "2.5vh", color: "green" }}>
              Final Score: {score} | Grade: {Math.round((score * 100) / 1500)}%
            </p>
            <button
              style={{
                marginTop: "4%",
                padding: "4% 10%",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "1.8vh",
                boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
                transition: "transform 0.1s",
              }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => {
                startSoundRef.current?.play().catch(() => {});
                setTimeout(submitScore, 800);
              }}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <p
              style={{
                position: "absolute",
                left: "43.7%",
                fontSize: "3vh",
                marginTop: "11.6%",
              }}
            >
              Question <strong>{currentIndex + 1}</strong> of <strong>15</strong>
            </p>
            <ToyQuestionUI toyInfo={toyQuestions[currentIndex]} />
          </>
        )}
      </div>

      <p
        style={{
          position: "absolute",
          bottom: "63%",
          left: "26%",
          width: "100%",
          fontSize: "3vh",
          textAlign: "center",
        }}
      >
        Score: <strong style={{ color: "white" }}>{score}</strong>
      </p>

      {feedback && (
        <div
          style={{
            position: "absolute",
            bottom: "60%",
            left: "71.4%",
            fontSize: "3.5vh",
            textAlign: "left",
            color: feedback === "Correct!" ? "green" : "red",
            maxWidth: "30%",
            margin: "0 auto",
            fontWeight: "bold",
          }}
        >
          {feedback}
        </div>
      )}

      {!gameOver && (
        <div
          style={{
            position: "absolute",
            left: "47.2%",
            bottom: "32%",
            display: "flex",
            justifyContent: "center",
            gap: "115%",
          }}
        >
          <button onClick={() => handleBoxClick("ones")} style={buttonStyle}>
            1s Box
          </button>
          <button onClick={() => handleBoxClick("tens")} style={buttonStyle}>
            10s Box
          </button>
          <button onClick={() => handleBoxClick("hundreds")} style={buttonStyle}>
            100s Box
          </button>
        </div>
      )}

      {!gameOver && <ToyAnimation toyInfo={toyQuestions[currentIndex]} x={toyX} y={toyY} />}
    </div>
  );
}

function ToyQuestionUI({ toyInfo }) {
  const { toyName, toyNumber } = toyInfo;
  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        left: "2%",
        fontSize: "2.7vh",
        marginTop: "15%",
      }}
    >
      <p>
        <strong>{toyName}</strong> labeled <strong>{toyNumber}</strong>
      </p>
    </div>
  );
}

const SCALE_MAP = {
  "Buzz Lightyear": 1.3, // enlarge Buzz 40%; tweak as needed
  "Piano": 1.3,
  "Car": 1.3,
  "Train": 1.6,
  "Plane": 1.2,
  "Soccerball": 0.9,
  "Xylophone": 1.2,
};

function ToyAnimation({ toyInfo, x, y }) {
  const SIZE = "16vh"; // square container baseline
  const scale = SCALE_MAP[toyInfo.toyName] || 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center",
        width: SIZE,
        height: SIZE,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        transition: "left 1s, top 1s",
      }}
    >
      <img
        src={toyInfo.toyImage}
        alt={toyInfo.toyName}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function determineCorrectBox(num) {
  if (num < 10) return "ones";
  if (num < 100) return "tens";
  return "hundreds";
}

function generateToyQuestions() {
  const shuffled = [...toyAssets];
  shuffleArray(shuffled);

  const ones = Array.from({ length: 5 }, () => randomInt(1, 9));
  const tens = Array.from({ length: 5 }, () => randomInt(10, 99));
  const hundreds = Array.from({ length: 5 }, () => randomInt(100, 999));
  const numbers = [...ones, ...tens, ...hundreds];
  shuffleArray(numbers);

  return numbers.map((num, i) => ({
    toyName: shuffled[i].name,
    toyImage: shuffled[i].src,
    toyNumber: num,
  }));
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const buttonStyle = {
  padding: "3% 25%",
  cursor: "pointer",
  backgroundColor: "#FF5722",
  color: "#fff",
  border: "none",
  borderRadius: "8%",
  fontSize: "1.73vh",
  boxShadow: "0 3% 5% rgba(0, 0, 0, 0.3)",
};
