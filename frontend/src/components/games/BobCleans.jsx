import React, { useState, useEffect } from "react";

// Background Image
import Background from "../../asset/images/toys_bg.png";

// Import all your toy images
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

// Exactly 15 toys, we use them all once
const toyAssets = [
  { name: "Alien",           src: Alien },
  { name: "Doll",            src: Doll },
  { name: "Bear",            src: Bear },
  { name: "Buzz Lightyear",  src: Buzz },
  { name: "Car",             src: Car },
  { name: "Train",           src: Train },
  { name: "Game Console",    src: Console },
  { name: "Xylophone",       src: Xylophone },
  { name: "Dinosaur",        src: Dinosaur },
  { name: "Plane",           src: Plane },
  { name: "Piano",           src: Piano },
  { name: "Robot",           src: Robot },
  { name: "Unicorn",         src: Unicorn },
  { name: "Duck",            src: Duck },
  { name: "Soccerball",      src: Soccerball },
];

export default function ToyBoxPlaceValues({onScoreSubmission}) {
  
  // Generate 15 unique (toy, number) pairs, ensuring each toy is used exactly once
  const [toyQuestions] = useState(() => generateToyQuestions());

  // Current question index (0–14)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Score, +100 per correct
  const [score, setScore] = useState(0);

  // Feedback text
  const [feedback, setFeedback] = useState("");

  // If we've answered all 15, game is over
  const gameOver = currentIndex >= toyQuestions.length;

  // -- Position State for the toy (X, Y) --
  // We'll place the toy near the top center to start
  const [toyX, setToyX] = useState("46%");
  const [toyY, setToyY] = useState("35%"); 
  // You can tweak these default coords

  const submitScore = () => {
    onScoreSubmission(Math.round((score/1500)*100))
  }

  // This function moves the toy to the approximate coords of the chosen box
  // Then after 1 second, we proceed to the next question
  function handleBoxClick(boxType) {
    if (gameOver) return;

    const { toyName, toyNumber } = toyQuestions[currentIndex];
    const correctBox = determineCorrectBox(toyNumber);

    // Decide where to move the toy on click
    let targetX = "0px";
    let targetY = "0px";

    if (boxType === "ones") {
      // Approx coords for the "1s Box" on your background
      targetX = "25%";
      targetY = "50%";
    } else if (boxType === "tens") {
      // Approx coords for the "10s Box"
      targetX = "50%";
      targetY = "50%";
    } else if (boxType === "hundreds") {
      // Approx coords for the "100s Box"
      targetX = "70%";
      targetY = "50%";
    }

    // Move the toy visually
    setToyX(targetX);
    setToyY(targetY);

    // Check correct or not, update feedback & score
    if (boxType === correctBox) {
      setScore((prev) => prev + 100); // +100 each correct
      setFeedback(`Correct!`);
    } else {
      setFeedback(`Wrong!`);
    }

    // After 1s, go to next question & reset toy position to top center
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setToyX("46%");
      setToyY("35%");
      setFeedback("");
    }, 1000);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        margin: 0,
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Main UI near top */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          width: "100%",
          textAlign: "center",
        }}
      >

        {gameOver ? (
          <div style={{fontFamily: 'Fantasy', fontSize: "1.6rem", position: "relative", top: "9.4rem", left: '2%', textAlign: "center" }}>
            <p>All 15 toys have been placed!</p>
            <p style={{ fontSize: "1.6rem", color: "green" }}>
              Final Score: {score} | Grade: {(Math.round(score*100/1500))}%
            </p>
            <button
              style={{
                marginTop: "0.1rem",
                padding: "0.6rem 1.2rem",
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
            <p style={{position: "absolute",
            left: "41.2%", fontSize: "2.2rem", marginTop:'11%', color: "#444" }}>
              Question <strong>{currentIndex + 1}</strong> of <strong>15</strong>
            </p>

            {/* Show toy label + toy image */}
            <ToyQuestionUI toyInfo={toyQuestions[currentIndex]} />
          </>
        )}
      </div>
      <div>
        <p style={{
          position: "absolute",
          bottom: "63%",
          left: '28%',
          width: "100%",
          fontSize: '2rem',
          textAlign: "center",
          }}>
          Score: <strong style={{ color: 'white' }}>{score}</strong>
        </p>
      </div>

      {feedback && (
        <div
          style={{
            position: "absolute",
            bottom: "62%",
            left: '75%',
            fontSize: '2rem',
            textAlign: "center",
            color: feedback.includes("Correct") ? "green" : "red",
            maxWidth: "300px",
            margin: "0 auto",
            fontWeight: "bold",
            }}
            >
              {feedback}
          </div>
        )}

      {/* Position the 3 Box Buttons */}
      {!gameOver && (
        <div
          style={{
            position: "absolute",
            left: "9%",
            right: "0%",
            bottom: "32%",
            display: "flex",
            justifyContent: "center",
            gap: "13rem",
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

      {/* The toy image container, absolutely positioned with transitions */}
      {!gameOver && (
        <ToyAnimation
          toyInfo={toyQuestions[currentIndex]}
          x={toyX}
          y={toyY}
        />
      )}
    </div>
  );
}

// Shows the toy's label & number (top UI), no changes
function ToyQuestionUI({ toyInfo }) {
  const { toyName, toyNumber } = toyInfo;
  return (
    <div style={{position: "relative", textAlign: 'center',
      left: "2%", fontSize: "1.5rem", marginTop:'15%', color: "#444" }}>
      <p>
        <strong>{toyName}</strong> labeled <strong>{toyNumber}</strong>
      </p>
    </div>
  );
}

// This component absolutely positions the toy image (like a "sprite") on the screen
function ToyAnimation({ toyInfo, x, y }) {
  const { toyName, toyImage } = toyInfo;
  if ((toyName === 'Piano') || (toyName === 'Plane')) {
    return (
      <img
        src={toyImage}
        alt={toyName}
        style={{
          position: "absolute",
          // Use the provided x,y for left/top
          left: x,
          top: y,
          width: "auto",
          height: "14%",
          transition: "left 1s, top 1s",
        }}
      />
    );
  }
  return (
    <img
      src={toyImage}
      alt={toyName}
      style={{
        position: "absolute",
        // Use the provided x,y for left/top
        left: x,
        top: y,
        width: "auto",
        height: "20%",
        transition: "left 1s, top 1s",
      }}
    />
  );
}

// Decide the correct box
function determineCorrectBox(num) {
  if (num < 10) return "ones";
  if (num < 100) return "tens";
  return "hundreds";
}

/**
 * Generate 15 questions: We have exactly 15 toys, so we:
 * 1) Shuffle toyAssets once
 * 2) Generate 15 random numbers (5 in [1..9], 5 in [10..99], 5 in [100..999])
 * 3) Pair each index i with toyAssets[i]
 */
function generateToyQuestions() {
  // Shuffle toyAssets so each game has a random order of these 15 toys
  const shuffledToys = [...toyAssets];
  shuffleArray(shuffledToys);

  // 5 from 1–9
  const ones = Array.from({ length: 5 }, () => randomInt(1, 9));
  // 5 from 10–99
  const tens = Array.from({ length: 5 }, () => randomInt(10, 99));
  // 5 from 100–999
  const hundreds = Array.from({ length: 5 }, () => randomInt(100, 999));

  const allNumbers = [...ones, ...tens, ...hundreds];
  shuffleArray(allNumbers); // randomize the order of numbers

  // Then pair each toy with a corresponding number
  // i.e. the i-th toy with the i-th number
  // This ensures exactly one usage of each toy
  return allNumbers.map((num, i) => {
    const chosenToy = shuffledToys[i];
    return {
      toyName: chosenToy.name,
      toyImage: chosenToy.src,
      toyNumber: num,
    };
  });
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

// Basic button style
const buttonStyle = {
  padding: "0.6rem 1.2rem",
  cursor: "pointer",
  backgroundColor: "#FF5722",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
};

