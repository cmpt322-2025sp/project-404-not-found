import React, { useRef, useState, useEffect } from "react";
import GroceryCheckoutbg from "../../asset/images/GroceryCheckout.png";
import successSoundFile from "../../asset/sounds/success.wav";
import failSoundFile from "../../asset/sounds/fail.wav";

const groceryNames = ["🍊 Oranges", "🍎 Apples", "🍌 Bananas", "🥛 Milk", "🥖 Bread", "🥚 Eggs"];

function getGroceriesWithRandomPrices() {
  return groceryNames.map((name) => ({
    name,
    price: Math.floor(Math.random() * 10) + 1,
  }));
}


function ConfettiEffect() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {confettiPieces.map((piece) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1; 
        const bgColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
        return (
          <div
            key={piece}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "100%",
              width: "12px",
              height: "12px",
              backgroundColor: bgColor,
              borderRadius: "50%",
              animation: `confetti-fall 1.5s ease-out ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function GroceryCheckout({ previousScore, onScoreSubmission }) {

  const [groceries] = useState(() => getGroceriesWithRandomPrices());

  const [score, setScore] = useState(previousScore);

  const [isGameOver, setIsGameOver] = useState(false);

  const totalRef = useRef(null);
  const [feedback, setFeedback] = useState("");

  const actualTotal = groceries.reduce((sum, item) => sum + item.price, 0);

  const successAudioRef = useRef(null);
  const failAudioRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCheckout = () => {
    const userTotal = parseInt(totalRef.current.value, 10) || 0;

    if (userTotal === actualTotal) {
      setFeedback(`Hooray! You got it right! The total is $${actualTotal} and you got a score of ${score}.`);
      if (successAudioRef.current) {
        successAudioRef.current.currentTime = 0;
        successAudioRef.current.play();
      }
      setShowConfetti(true);
      setIsGameOver(true);
    } else {
      setFeedback(`Oops! You entered $${userTotal}, which is wrong. Try again!`);
      if (failAudioRef.current) {
        failAudioRef.current.currentTime = 0;
        failAudioRef.current.play();
      }
      setShowConfetti(false);

      setScore((prev) => Math.max(0, prev - 100));
    }
    if (score === 0) {
      setIsGameOver(true);
      setFeedback(`Oops! You entered $${userTotal}, which is wrong. You got a total score of ${score}.`);
    }
  };

  const submitScore = () => {
      onScoreSubmission(Math.round((score/2000)*100))
  }

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Audio Elements */}
      <audio ref={successAudioRef} src={successSoundFile} />
      <audio ref={failAudioRef} src={failSoundFile} />

      <div
        style={{
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${GroceryCheckoutbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Confetti */}
        {showConfetti && <ConfettiEffect />}

        <div
          style={{
            position: "relative",
            width: "360px",
            minHeight: "520px",
            padding: "1.5rem",
            borderRadius: "16px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            background: `
              repeating-linear-gradient(
                0deg,
                #fff 0px,
                #fff 26px,
                #ffe7e7 26px,
                #ffe7e7 28px
              )
            `,
            zIndex: 1,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "1.8rem",
              color: "#FF5722",
            }}
          >
            Grocery Fun!
          </h2>

          <p style={{ fontSize: "1rem", color: "#333", marginBottom: "1rem" }}>
            Score: <strong style={{ color: "#FF5722" }}>{score}</strong>
          </p>

          <p style={{ margin: "0 0 1rem 0", fontSize: "1.0rem", color: "#333" }}>
            Here is Bob's groceries! Can you add them up?
          </p>

          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "1.2rem" }}>
            {groceries.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.5rem", color: "#555" }}>
                <strong>{item.name}</strong> – ${item.price}
              </li>
            ))}
          </ul>

          {/* Hide the input + button */}
          {!isGameOver && (
            <>
              <div style={{ marginTop: "1rem" }}>
                <label style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>Total: </strong>
                  <input
                    type="number"
                    ref={totalRef}
                    defaultValue=""
                    style={{
                      marginLeft: "0.5rem",
                      width: "100px",
                      fontSize: "1rem",
                      padding: "0.3rem",
                      border: "2px solid #FF5722",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                  />
                </label>
              </div>

              <button
                onClick={handleCheckout}
                style={{
                  marginTop: "1.2rem",
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  backgroundColor: "#FF5722",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
                  transition: "transform 0.1s",
                }}
                onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              >
                Check Out
              </button>
            </>
          )}

          {/* If the game is over, show a "Continue" button (does nothing yet) */}
          {isGameOver && (
            <button
              style={{
                marginTop: "1.2rem",
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
          )}

          {feedback && (
            <div
              style={{
                marginTop: "1.2rem",
                fontSize: "1rem",
                color: feedback.includes("Hooray") ? "green" : "red",
              }}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
