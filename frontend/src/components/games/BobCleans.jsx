import React, { useRef, useState, useEffect } from "react";
import Background from "../../asset/images/toys_bg.png";

import successSoundFile from "../../asset/sounds/success.wav";
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
 * 1) BobCleans: top-level containing instructions => game flow
 * 2) InstructionsPage
 * 3) The actual game: ToyBoxPlaceValues
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

// ====== TOP-LEVEL COMPONENT ======
export default function BobCleans({
  onScoreSubmission = () => { }, // fallback if no parent prop is passed
}) {
  const [showInstructions, setShowInstructions] = useState(true);

  // Called after user clicks "Start" in instructions
  function handleStart() {
    setShowInstructions(false);
  }

  // If not showing instructions => show the game
  return (
    <div style={{ fontFamily: "'Comic Sans MS', cursive" }}>
      {showInstructions ? (
        <InstructionsPage onStart={handleStart} />
      ) : (
        <ToyBoxPlaceValues
          onScoreSubmission={(grade) => {
            // Called when user clicks final "Continue"
            onScoreSubmission(grade);
            // If you want to go back to instructions:
            setShowInstructions(true);
          }}
        />
      )}
    </div>
  );
}

// ====== 1) INSTRUCTIONS ======
function InstructionsPage({ onStart }) {
  return (
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
            fontSize: "1rem",
            position: "relative",
            top: "21%",
            left: "38.9%",
            textAlign: "center",
          }}
        >
          <strong style={{ fontSize: "150%" }}>How to Play</strong>
        </p>
        <p
          style={{
            position: "absolute",
            width: "26%",
            fontSize: "1rem",
            position: "relative",
            top: "17%",
            left: "39.2%",
            textAlign: "left",
          }}
        >
          <br />
          - You have 15 unique toys, each labeled with a random number.
          <br />
          - Decide if the number belongs in the <em>1s box</em>,
          the <em>10s box</em>, or the <em>100s box</em>.
          <br />
          - Each correct answer scores 100 points!
          <br />
          - After all 15 toys are placed, you'll see your final score and grade.
        </p>
        <button
          onClick={onStart}
          style={{
            position: "absolute",
            marginTop: "14%",
            padding: "0.5% 4%",
            fontSize: "1.7rem",
            left: "47.6%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8%",
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>
      <br />
    </div>
  );
}

// ====== 2) GAME LOGIC ======
function ToyBoxPlaceValues({ onScoreSubmission }) {
  // Generate 15 unique (toy, number) pairs
  const [toyQuestions] = useState(() => generateToyQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [toyX, setToyX] = useState("48%");
  const [toyY, setToyY] = useState("270px");

  const gameOver = currentIndex >= toyQuestions.length;

  // Create refs to audio elements
  const successAudioRef = useRef(null);
  const failAudioRef = useRef(null);

  function submitScore() {
    // We call the parent's function with final grade
    const grade = Math.round((score / 1500) * 100);
    onScoreSubmission(grade);
  }

  function handleBoxClick(boxType) {
    if (gameOver) return;

    const { toyNumber } = toyQuestions[currentIndex];
    const correctBox = determineCorrectBox(toyNumber);

    let targetX = "0px";
    let targetY = "0px";
    if (boxType === "ones") {
      targetX = "25%";
      targetY = "400px";
    } else if (boxType === "tens") {
      targetX = "50%";
      targetY = "300px";
    } else if (boxType === "hundreds") {
      targetX = "70%";
      targetY = "350px";
    }

    setToyX(targetX);
    setToyY(targetY);

    if (boxType === correctBox) {
      setScore((prev) => prev + 100);
      setFeedback("Correct!");
      // Play success audio
      if (successAudioRef.current) {
        setTimeout(() => {
          successAudioRef.current.currentTime = 0;
          successAudioRef.current.play();
        }, 400);
      }
    } else {
      setFeedback("Wrong!");
      // Play fail audio
      if (failAudioRef.current) {
        setTimeout(() => {
          failAudioRef.current.currentTime = 0;
          failAudioRef.current.play();
        }, 400);
      }
    }
    // Move on after 1 second
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setToyX("48%");
      setToyY("270px");
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
      {/* Audio elements */}
      <audio ref={successAudioRef} src={successSoundFile} />
      <audio ref={failAudioRef} src={failSoundFile} />

      <div
        style={{
          position: "absolute",
          top: "2.2%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {gameOver ? (
          <div
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              fontSize: "18px",
              position: "fixed",
              top: "27.4%",
              left: "42%",
              textAlign: "center",
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <p>All 15 toys have been placed!</p>
            <p style={{ fontSize: "18px", color: "green" }}>
              Final Score: {score} | Grade: {Math.round((score * 100) / 1500)}%
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
                boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
                transition: "transform 0.1s",
              }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              onClick={submitScore}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <p
              style={{
                position: "absolute",
                left: "41.2%",
                fontSize: "2.2rem",
                marginTop: "11%",
              }}
            >
              Question <strong>{currentIndex + 1}</strong> of <strong>15</strong>
            </p>
            <ToyQuestionUI toyInfo={toyQuestions[currentIndex]} />
          </>
        )}
      </div>

      <div>
        <p
          style={{
            position: "absolute",
            bottom: "63%",
            left: "26%",
            width: "100%",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          Score: <strong style={{ color: "white" }}>{score}</strong>
        </p>
      </div>

      {feedback && (
        <div
          style={{
            position: "absolute",
            bottom: "62%",
            left: "71.4%",
            fontSize: "2rem",
            textAlign: "left",
            color: feedback === "Correct!" ? "green" : "red",
            maxWidth: "300px",
            margin: "0 auto",
            fontWeight: "bold",
          }}
        >
          {feedback}
        </div>
      )}

      {/* Buttons row */}
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

      {/* Animated toy sprite */}
      {!gameOver && (
        <ToyAnimation toyInfo={toyQuestions[currentIndex]} x={toyX} y={toyY} />
      )}
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
        fontSize: "1.5rem",
        marginTop: "15%",
      }}
    >
      <p>
        <strong>{toyName}</strong> labeled <strong>{toyNumber}</strong>
      </p>
    </div>
  );
}

function ToyAnimation({ toyInfo, x, y }) {
  const { toyImage } = toyInfo;
  return (
    <img
      src={toyImage}
      alt={toyInfo.toyName}
      style={{
        position: "relative",
        paddingTop: "0.6%",
        left: x,
        top: y,
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "18%",
        transition: "left 1s, top 1s",
      }}
    />
  );
}

// Evaluate correct box
function determineCorrectBox(num) {
  if (num < 10) return "ones";
  if (num < 100) return "tens";
  return "hundreds";
}

// Generate 15 pairs: unique toy + random number
function generateToyQuestions() {
  const shuffledToys = [...toyAssets];
  shuffleArray(shuffledToys);

  const ones = Array.from({ length: 5 }, () => randomInt(1, 9));
  const tens = Array.from({ length: 5 }, () => randomInt(10, 99));
  const hundreds = Array.from({ length: 5 }, () => randomInt(100, 999));
  const allNumbers = [...ones, ...tens, ...hundreds];
  shuffleArray(allNumbers);

  return allNumbers.map((num, i) => ({
    toyName: shuffledToys[i].name,
    toyImage: shuffledToys[i].src,
    toyNumber: num,
  }));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
  borderRadius: "8px",
  fontSize: "1rem",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
};
