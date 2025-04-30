import React, { useRef, useState, useEffect } from "react";
import GroceryCheckoutbg from "../../asset/images/GroceryCheckout.png";
import successSoundFile from "../../asset/sounds/success.mp3";
import failSoundFile from "../../asset/sounds/fail.wav";
import startSound from "../../asset/sounds/gameStart.mp3";
import { mainMusic, groceryMusic } from "../../utils/bgMusic";


const groceryNames = [
  "🍊 Oranges",
  "🍎 Apples",
  "🍌 Bananas",
  "🥛 Milk",
  "🥖 Bread",
  "🥚 Eggs",
];

function randomList() {
  return groceryNames.map((n) => ({
    name: n,
    price: Math.floor(Math.random() * 10) + 1,
  }));
}

function ConfettiEffect() {
  const pieces = Array.from({ length: 50 }, (_, i) => i);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {pieces.map((id) => {
        const delay = Math.random();
        const left  = Math.random() * 100;
        const bg    = `hsl(${Math.random() * 360},80%,60%)`;
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "100%",
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: bg,
              animation: `confetti-fall 1.5s ease-out ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                                    */
/* ────────────────────────────────────────────────────────────────── */
export default function GroceryCheckout({ previousScore, onScoreSubmission }) {
  /* background-music hand-off */
  useEffect(() => {
    groceryMusic.play().catch(() => {});
    return () => {
      groceryMusic.pause();
      mainMusic.play().catch(() => {});
    };
  }, []);

  const [groceries] = useState(randomList);
  const [score, setScore] = useState(previousScore);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const totalRef        = useRef(null);
  const successAudioRef = useRef(null);
  const failAudioRef    = useRef(null);
  const startSoundRef   = useRef(null);

  /* auto-focus once on mount */
  useEffect(() => totalRef.current?.focus(), []);

  /* tidy confetti */
  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(t);
  }, [showConfetti]);

  const actualTotal = groceries.reduce((s, g) => s + g.price, 0);

  /* --------------------------------------------------------------- */
  /*   CHECK-OUT HANDLER                                             */
  /* --------------------------------------------------------------- */
  const checkAnswer = () => {
    const userTotal = parseInt(totalRef.current.value || "0", 10);

    if (userTotal === actualTotal) {
      /* ✓ correct */
      setFeedback(
        `Hooray! You got it right! The total is $${actualTotal} and you scored ${score}.`
      );
      successAudioRef.current?.play().catch(() => {});
      setShowConfetti(true);
      setIsGameOver(true);
    } else {
      /* ✗ wrong */
      setFeedback(`Oops! You entered $${userTotal}. Try again!`);
      failAudioRef.current?.play().catch(() => {});
      setScore((prev) => Math.max(0, prev - 100));
      if (score - 100 <= 0) setIsGameOver(true);

      /* 🔄 clear + refocus for next attempt */
      setTimeout(() => {
        if (totalRef.current) {
          totalRef.current.value = "";       // clear box
          totalRef.current.focus();          // re-focus it
        }
      }, 0);
    }
  };

  const submitScore = () => {
    onScoreSubmission(Math.round((score / 2000) * 100));
  };

  /* --------------------------------------------------------------- */
  /* RENDER                                                          */
  /* --------------------------------------------------------------- */
  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0%   {transform:translateY(0); opacity:1;}
            100% {transform:translateY(-120vh) rotate(360deg); opacity:0;}
          }
        `}
      </style>

      <audio ref={successAudioRef} src={successSoundFile} />
      <audio ref={failAudioRef}    src={failSoundFile}     />

      <div
        style={{
          position: "absolute",
          inset: 0,
          fontFamily: "'Comic Sans MS', cursive",
          background: `url(${GroceryCheckoutbg}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          padding: "5%",
          boxSizing: "border-box",
        }}
      >
        {showConfetti && <ConfettiEffect />}

        {/* receipt / panel */}
        <div
          style={{
            position: "relative",
            width: 360,
            padding: "1.5rem",
            borderRadius: 16,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            background:
              "repeating-linear-gradient(0deg,#fff 0px,#fff 26px,#ffe7e7 26px,#ffe7e7 28px)",
            zIndex: 1,
            left: "8%",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#FF5722" }}>
            Grocery&nbsp;Fun!
          </h2>

          <p>
            Score:&nbsp;
            <strong style={{ color: "#FF5722" }}>{score}</strong>
          </p>

          <p style={{ margin: "1rem 0" }}>
            Here are Bob&nbsp;'s groceries – can you add them up?
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {groceries.map((g, i) => (
              <li key={i} style={{ fontSize: "120%", marginBottom: "0.5rem", color: "#555" }}>
                <strong>{g.name}</strong> – ${g.price}
              </li>
            ))}
          </ul>

          {/* ---- INPUT & CHECKOUT BUTTON ---- */}
          {!isGameOver && (
            <>
              <div style={{ marginTop: "1rem" }}>
                <label>
                  <strong>Total:&nbsp;</strong>
                  <input
                    ref={totalRef}
                    type="number"
                    autoFocus          /* focus on first render        */
                    onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                    style={{
                      marginLeft: "0.5rem",
                      width: 100,
                      fontSize: "1rem",
                      padding: "0.3rem",
                      border: "2px solid #FF5722",
                      borderRadius: 8,
                      outline: "none",
                    }}
                  />
                </label>
              </div>

              <button onClick={checkAnswer} style={btn("#FF5722")}>
                Check&nbsp;Out
              </button>
            </>
          )}

          {/* ---- CONTINUE BUTTON ---- */}
          {isGameOver && (
            <button
              onClick={() => {
                startSoundRef.current?.play().catch(() => {});
                setTimeout(submitScore, 800);
              }}
              style={btn("#4CAF50")}
            >
              Continue
            </button>
          )}

          {/* feedback */}
          {feedback && (
            <div
              style={{
                marginTop: "1.2rem",
                fontSize: "1rem",
                color: feedback.startsWith("Hooray") ? "green" : "red",
              }}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>

      <audio ref={startSoundRef} src={startSound} />
    </>
  );
}

/* helper for buttons */
const btn = (bg) => ({
  marginTop: "1.2rem",
  padding: "0.6rem 1.2rem",
  cursor: "pointer",
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: "1rem",
  boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
  transition: "transform 0.1s",
});
