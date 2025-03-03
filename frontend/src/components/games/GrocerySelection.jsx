import React, { useState } from "react";
import background from "../../asset/images/background3.png";
import bobBoard from "../../asset/images/bobBoard.png";
import bob from "../../asset/images/bob2.png";
import Question from "./Question";
import GroceryCheckout from "./GroceryCheckout";

export default function GrocerySelection({ onScoreSubmission }) {
  const [count, setCount] = useState(0);
  const initialX = Math.floor(Math.random() * 11);
  const initialY = Math.floor(Math.random() * 11);

  const [winner, setWinner] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [score, setScore] = useState(1000);
  const [circles, setCircles] = useState(Array(10).fill(" ⚫"));

  const [showCheckout, setShowCheckout] = useState(false);

  const [objectData, setObjectData] = useState({
    x: initialX,
    y: initialY,
    color: "white",
    correctAnswer: initialX + initialY,
  });

  const getColor = (s) => {
    if (s <= 500) return "red";
    if (s <= 800) return "orange";
    return "green";
  };

  function handleAnswerCheck(userInput) {
    const numericValue = parseInt(userInput, 10);

    if (numericValue === objectData.correctAnswer) {
      setCount((prevCount) => prevCount + 1);

      if (count >= 9 || score <= 50) {
        setWinner(true);
        return;
      }

      const newX = Math.floor(Math.random() * 11);
      const newY = Math.floor(Math.random() * 11);

      setObjectData({
        x: newX,
        y: newY,
        color: "white",
        correctAnswer: newX + newY,
      });

      if (circles[count] !== " 🟡") {
        circles[count] = " 🟢";
        setCircles([...circles]);
      }
    } else {

      setObjectData((prev) => ({ ...prev, color: "red" }));
      setScore((prevScore) => prevScore - 50);
      circles[count] = " 🟡";
      setCircles([...circles]);
    }
  }


  if (showCheckout) {
    // Add 1000 to the final score for the next game
    const updatedScore = score + 1000;
    return <GroceryCheckout previousScore={updatedScore} onScoreSubmission={onScoreSubmission} />;
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
            if (score > 0) {
              setScore((prev) => prev - 100);
              setPrevQuestion(objectData.correctAnswer);
              setNextQuestion(true);
              handleAnswerCheck(objectData.correctAnswer);

              if (count < 10) {
                circles[count] = "🔴";
                setCircles([...circles]);
              }
              setTimeout(() => {
                setNextQuestion(false);
              }, 1000);
            }
          }}
        >
          SKIP
        </button>
        )}
      </div>

      <Question
        x={objectData.x}
        y={objectData.y}
        color={objectData.color}
        onAnswerCheck={handleAnswerCheck}
      />

      <p>⭐</p>

      <div
        style={{
          position: "absolute",
          marginLeft: "-27%",
          marginTop: "34%",
          height: "150px",
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
          QUESTIONS LEFT: <br />
          {circles}
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

      {winner && (
        <div
          style={{
            position: "absolute",
            marginLeft: "-1.5%",
            marginTop: "-30%",
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
