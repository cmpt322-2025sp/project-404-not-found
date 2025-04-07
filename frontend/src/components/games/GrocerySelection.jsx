import React, { useState } from "react";
import background from "../../asset/images/background3.png";
import bobBoard from "../../asset/images/bobBoard.png";
import bob from "../../asset/images/bob2.png";
import Question from "./Question";
import GroceryCheckout from "./GroceryCheckout";

export default function GrocerySelection({ onScoreSubmission }) {
  const fruitEmojis = ["🍎", "🍌", "🍊", "🍓", "🍍", "🍉", "🍇", "🍒", "🍑", "🥭"];
  
  // We track total attempts - increments after *every* submission (correct or wrong)
  const [attempt, setAttempt] = useState(0);

  const [winner, setWinner] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [score, setScore] = useState(1000);

  // Circles for up to 10 attempts:
  //  - "🟢" for correct
  //  - "🟡" for wrong
  //  - "🔴" for skip
  //  - "⚫" is unused / not yet attempted
  const [circles, setCircles] = useState(Array(10).fill("⚫"));
  
  const [showCheckout, setShowCheckout] = useState(false);

  // Generate initial question
  const initialX = Math.floor(Math.random() * 11);
  const initialY = Math.floor(Math.random() * 11);
  const initialEmoji =
    fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

  // objectData includes the current question/emoji
  const [objectData, setObjectData] = useState({
    x: initialX,
    y: initialY,
    color: "white",
    correctAnswer: initialX + initialY,
    emoji: initialEmoji,
  });

  // Helper to color the score
  const getColor = (s) => {
    if (s <= 500) return "red";
    if (s <= 800) return "orange";
    return "green";
  };

  function handleAnswerCheck(userInput) {
    const numericValue = parseInt(userInput, 10);
    // Always increment attempt, because the user has tried a submission
    // but do it at the end, *after* you set circles
    let wasCorrect = false;

    if (numericValue === objectData.correctAnswer) {
      // Mark this attempt's circle as 🟢
      setCircles((prev) =>
        prev.map((c, i) => (i === attempt ? "🟢" : c))
      );
      wasCorrect = true;

      // Prepare next question
      const newX = Math.floor(Math.random() * 11);
      const newY = Math.floor(Math.random() * 11);
      const newEmoji =
        fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

      setObjectData({
        x: newX,
        y: newY,
        color: "white",
        correctAnswer: newX + newY,
        emoji: newEmoji,
      });
      if(circles[count] !== ' 🟡'){
        circles[count] = ' 🟢';  
        setCircles([...circles]);
      }

    } else {
      // Mark this attempt's circle as 🟡
      setCircles((prev) =>
        prev.map((c, i) => (i === attempt ? "🟡" : c))
      );
      // Subtract points for each wrong attempt
      setScore((prevScore) => prevScore - 50);
      
      // If you want them to move on to next question even if wrong:
      //   just generate new question below like we do for correct
      // If you want them to stay on the same question until correct:
      //   do nothing special for generating the next question here
      //
      // For demonstration, let's keep the same question. The user can keep trying.
      // So we do NOT change objectData or generate a new one yet.
    }

    // Now increment attempt
    setAttempt((prev) => {
      const newAttempt = prev + 1;
      // If we've used up 10 attempts or the score is too low:
      if (newAttempt >= 10 || score <= 50) {
        setWinner(true);
      }
      return newAttempt;
    });
  }

  if (showCheckout) {
    // Add 1000 to the final score for the next game
    const updatedScore = score + 1000;
    return (
      <GroceryCheckout
        previousScore={updatedScore}
        onScoreSubmission={onScoreSubmission}
      />
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
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
      <div
        id="header"
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
              // SKIP logic
              if (score > 0 && attempt < 10) {
                setScore((prev) => prev - 100);
                setPrevQuestion(objectData.correctAnswer);

                // If they skip, we mark the circle as 🔴
                setCircles((prevCircles) =>
                  prevCircles.map((c, i) => (i === attempt ? "🔴" : c))
                );

                // Move on to next question
                const newX = Math.floor(Math.random() * 11);
                const newY = Math.floor(Math.random() * 11);
                const newEmoji =
                  fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

                setObjectData({
                  x: newX,
                  y: newY,
                  color: "white",
                  correctAnswer: newX + newY,
                  emoji: newEmoji,
                });

                // Show the "prev question" label
                setNextQuestion(true);
                setTimeout(() => {
                  setNextQuestion(false);
                }, 1000);

                // Advance attempt by 1
                setAttempt((prev) => {
                  const newAttempt = prev + 1;
                  if (newAttempt >= 10 || score <= 50) {
                    setWinner(true);
                  }
                  return newAttempt;
                });
              }
            }}
          >
            SKIP
          </button>
        )}
      </div>

      {/* Our question component just displays question & emoji, plus an input */}
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
          key={circles.join("") + "_key_for_score"}
        >
          {score}
        </p>
      </div>

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
          {/* "Continue" button that triggers the next game */}
          <button
            onClick={() => setShowCheckout(true)}
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
    </div>
  );
}
