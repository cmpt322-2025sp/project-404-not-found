import { useState } from "react";
import background from "../../asset/images/background3.png";
import bobBoard from "../../asset/images/bobBoard.png";
import bob from "../../asset/images/bob2.png";
import Question from "./Question";

export default function GrocerySelection() {
  const [count, setCount] = useState(0);
  const initialX = Math.floor(Math.random() * 11);
  const initialY = Math.floor(Math.random() * 11);
  const [winner, setWinner] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [prevQuestion,setPrevQuestion] = useState(null);
  const [score, setScore] = useState(1000);

  // const[counter, setCounter] = useState(0);

  const [objectData, setObjectData] = useState({
    x: initialX,
    y: initialY,
    color: "white",
    correctAnswer: initialX + initialY
  });

  
  
  

  function handleAnswerCheck(userInput) {
    const numericValue = parseInt(userInput, 10);
   
    if (numericValue === objectData.correctAnswer) {
      setCount((prevCount) => prevCount + 1);

      if(parseInt(count) >= 10 || score <=0){
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

      
    } else {
      setObjectData((prev) => ({
        ...prev,
        color: "red",
      }));
      setScore((prevScore) => prevScore -50);
    }
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
        flexDirection: "column"
      }}
    >
    <div
      id="header"
      style={{
        // position: "absolute",

        backgroundImage: `url(${bobBoard})`,
        height: "100px",
        width: "560px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-11%",
        marginLeft: "-1%"
      }}
    >
    </div>
      <Question
        x={objectData.x}
        y={objectData.y}
        color={objectData.color}
        onAnswerCheck={handleAnswerCheck} 
      />
      <p> count: {count} , score: {score} </p>

        
       
      <button style={{
          // position: "absolute",
          height: "40px",
          width: "60px",
          marginLeft: "-30%"

        }} onClick={() => {
            if(score >0){
             setScore((prevScore) => prevScore -100);
            }
             setPrevQuestion(objectData.correctAnswer); 
             setNextQuestion(true);
             handleAnswerCheck(objectData.correctAnswer); 
             const timer = setTimeout(() => {
              setNextQuestion(false); 
            }, 3000);
          
        }}> SKIP</button> 

      { winner && (
      <div
      style={{
      position: "absolute",
      marginLeft: "-10%",
      top: "170px",
      height: "110px",
      width: "270px",
      backgroundColor: "white"
      }}
      > 
      <h1 style={{
            position: "absolute",
            left: "50px",
        }}
        > 🎉 score: {score} 🎉</h1>
      </div>
    )}


    { nextQuestion && ( <div
      style={{
      position: "absolute",
      left: "790px",
      top: "190px",
      height: "50px",
      width: "50px",
      backgroundColor: "lightgreen"
      }}
      > 
      <p style={{
            position: "absolute",
            left: "20px",
        }}
        > {prevQuestion}</p>
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
          top: "400px",
          left: "690px",
        }} 
      />
    </div>
   
  );
}

