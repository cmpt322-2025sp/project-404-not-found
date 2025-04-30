import React, { useRef, useEffect, useState } from "react";
import background from "../../asset/images/background3.png";
import bobBoard from "../../asset/images/bobBoard.png";
import bob from "../../asset/images/bob2.png";

import Question from "./Question";
import GroceryCheckout from "./GroceryCheckout";

import { mainMusic, groceryMusic } from "../../utils/bgMusic";

import startSound from "../../asset/sounds/gameStart.mp3";
import successSoundFile from "../../asset/sounds/success.mp3";
import failSoundFile from "../../asset/sounds/fail.wav";

/* ───────────────────────────────────────────────────────────── */

export default function GrocerySelection({ onScoreSubmission }) {
  const fruitEmojis = ["🍎", "🍌", "🍊", "🍓", "🍍", "🍉", "🍇", "🍒", "🍑", "🥭"];

  /* audio refs */
  const successAudioRef = useRef(null);   // ✅ correct ding
  const failAudioRef = useRef(null);   // ❌ wrong buzz
  const startSoundRef = useRef(null);   // ▶️ continue button

  /* swap background music ----------------------------------- */
  useEffect(() => {
    mainMusic.pause();
    groceryMusic.currentTime = 0;
    groceryMusic.play().catch(() => { });

    return () => groceryMusic.pause();    // restore when leaving
  }, []);

  /* ---------------------------------------------------------- */
  /*   GAME STATE                                               */
  /* ---------------------------------------------------------- */
  const [attempt, setAttempt] = useState(0);
  const [winner, setWinner] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [score, setScore] = useState(1000);
  const [circles, setCircles] = useState(Array(10).fill("⚫"));
  const [showCheckout, setShowCheckout] = useState(false);

  /* generate first question */
  const rand = () => Math.floor(Math.random() * 11);
  const newQ = () => ({
    x: rand(),
    y: rand(),
    color: "white",
    correctAnswer: rand() + rand(),   // reset later anyway
    emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
  });
  const [objectData, setObjectData] = useState(() => {
    const x = rand(), y = rand();
    return {
      x,
      y,
      color: "white",
      correctAnswer: x + y,
      emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
    };
  });

  /* colour helper */
  const getColor = (s) => (s <= 500 ? "red" : s <= 800 ? "orange" : "green");

  /* ---------------------------------------------------------- */
  /*   ANSWER HANDLER                                           */
  /* ---------------------------------------------------------- */
  function handleAnswerCheck(userInput) {
    const num = parseInt(userInput, 10);
    const correct = num === objectData.correctAnswer;

    /* update attempt marker */
    setCircles((prev) =>
      prev.map((c, i) => (i === attempt ? (correct ? "🟢" : "🟡") : c))
    );

    if (correct) {
      successAudioRef.current?.play().catch(() => { });
      /* new question */
      const x = rand(), y = rand();
      setObjectData({
        x, y,
        color: "white",
        correctAnswer: x + y,
        emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
      });
    } else {
      failAudioRef.current?.play().catch(() => { });
      setScore((p) => p - 50);
    }

    /* next attempt & check for game-over */
    setAttempt((p) => {
      const n = p + 1;
      if (n >= 10 || score - (correct ? 0 : 50) <= 50) setWinner(true);
      return n;
    });
  }

  /* ---------------------------------------------------------- */
  /*   BRANCH INTO CHECKOUT GAME                                */
  /* ---------------------------------------------------------- */
  if (showCheckout) {
    const updated = score + 1000;   // bonus for next game
    return (
      <GroceryCheckout
        previousScore={updated}
        onScoreSubmission={onScoreSubmission}
      />
    );
  }

  /* ---------------------------------------------------------- */
  /*   RENDER                                                   */
  /* ---------------------------------------------------------- */
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: 0,
        background: `url(${background}) center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        top: 0,
        left: 0,
        padding: "5%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* header with SKIP */}
      <div
        style={{
          backgroundImage: `url(${bobBoard})`,
          height: "100px",
          width: "560px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "-18%",
          marginLeft: "-1%",
        }}
      >
        {!winner && (
          <button
            style={{
              height: "40px",
              width: "60px",
              marginLeft: "9%",
              marginTop: "20%",
            }}
            onClick={() => {
              if (score > 0 && attempt < 10) {
                /* ★ play fail sound for a skipped question */
                failAudioRef.current?.play().catch(() => {});

                setScore((p) => p - 100);
                setPrevQuestion(objectData.correctAnswer);
                setCircles((prev) =>
                  prev.map((c, i) => (i === attempt ? "🔴" : c))
                );

                /* next question */
                const x = rand(), y = rand();
                setObjectData({
                  x, y,
                  color: "white",
                  correctAnswer: x + y,
                  emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
                });

                setNextQuestion(true);
                setTimeout(() => setNextQuestion(false), 1000);

                setAttempt((p) => (p + 1 >= 10 ? setWinner(true) : p + 1));
              }
            }}
          >
            SKIP
          </button>
        )}
      </div>

      {/* QUESTION COMPONENT */}
      <Question
        x={objectData.x}
        y={objectData.y}
        color={objectData.color}
        emoji={objectData.emoji}
        onAnswerCheck={handleAnswerCheck}
      />

      <p>⭐</p>

      <div
        style={{
          position: "absolute",
          marginLeft: "-27%",
          marginTop: "34%",
          height: "160px",
          width: "350px",
          backgroundColor: "white",
        }}
      >
        <p
          style={{
            marginLeft: "4%",
            fontSize: "19px",
            fontFamily: "Impact",
          }}
        >
          ATTEMPTS: <br />
          {/* Show the circles */}
          <div key={circles.join("")}>{circles}</div>
          <br />
          CURRENT SCORE:
        </p>
        <p
          style={{
            marginTop: "-6%",
            marginLeft: "4%",
            fontSize: "40px",
            fontFamily: "Impact",
            color: getColor(score),
          }}
        >
          {score}
        </p>
      </div>

      {/* WINNER PANEL */}
      {winner && (
        <div
          style={{
            position: "absolute",
            marginLeft: "-1.5%",
            marginTop: "-20%",
            height: "180px",
            width: "300px",
            backgroundColor: "gold",
          }}
        >
          <h1
            style={{
              position: "absolute",
              left: "30px",
              top: "10px",
              fontSize: "40px",
              fontFamily: "Impact",
            }}
          >
            SCORE: {score} 🎉
          </h1>

          <button
            onClick={() => {
              startSoundRef.current?.play().catch(() => { });
              setTimeout(() => setShowCheckout(true), 800);
            }}
            style={{
              position: "absolute",
              left: "100px",
              top: "100px",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      )}

      {/* previous-question flash */}
      {nextQuestion && (
        <div
          style={{
            position: "absolute",
            marginLeft: "25%",
            marginTop: "-32%",
            height: "100px",
            width: "100px",
            backgroundColor: "lightgreen",
          }}
        >
          <p
            style={{
              position: "absolute",
              left: "30px",
              top: "-22px",
              fontSize: "45px",
              fontFamily: "Impact",
            }}
          >
            {prevQuestion}
          </p>
        </div>
      )}

      {/* Bob sprite */}
      <div
        style={{
          position: "absolute",
          backgroundImage: `url(${bob})`,
          height: "400px",
          width: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          top: "55%",
          left: "55%",
        }}
      />

      {/* hidden audio tags */}
      <audio ref={successAudioRef} src={successSoundFile} />
      <audio ref={failAudioRef} src={failSoundFile} />
      <audio ref={startSoundRef} src={startSound} />
    </div>
  );
}
