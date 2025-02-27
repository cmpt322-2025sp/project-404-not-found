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
  const [circles, setCircles] = useState(Array(10).fill(' ⚫'));
  // const[counter, setCounter] = useState(0);

  const [objectData, setObjectData] = useState({
    x: initialX,
    y: initialY,
    color: "white",
    correctAnswer: initialX + initialY
  });

  const getColor = (score) => {
    if (score <= 500) return 'red';
    if (score <= 800) return 'orange';
    return 'green';
  };
  
  

  function handleAnswerCheck(userInput) {
    const numericValue = parseInt(userInput, 10);
   

    if (numericValue === objectData.correctAnswer) {
      setCount((prevCount) => prevCount + 1);


      if(parseInt(count) >= 9 || score <= 50){
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
      if(circles[count] !== ' 🟡'){
        circles[count] = ' 🟢';  
        setCircles([...circles]);
      }

      
    } else {
      setObjectData((prev) => ({
        ...prev,
        color: "red",
      }));
      setScore((prevScore) => prevScore -50);
      circles[count] = ' 🟡';
      setCircles([...circles]);
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
        marginTop: "-18%",
        marginLeft: "-1%"
      }}
    >

<button style={{
          // position: "absolute",
          height: "40px",
          width: "60px",
          marginLeft: "9%",
          marginTop: "20%"
          

        }} onClick={() => {
            if(score > 0){
             setScore((prevScore) => prevScore -100);
            
             setPrevQuestion(objectData.correctAnswer); 
             setNextQuestion(true);
             handleAnswerCheck(objectData.correctAnswer); 
             if(count<10){
             circles[count] = ' 🔴'; 
             setCircles([...circles]);
             }
             const timer = setTimeout(() => {
              setNextQuestion(false); 
            }, 1000);
          }
          
        }}> SKIP</button> 

    </div>
      <Question
        x={objectData.x}
        y={objectData.y}
        color={objectData.color}
        onAnswerCheck={handleAnswerCheck} 
      />
      <p>⭐</p>

      <div style={{
         position: "absolute",
         marginLeft: "-27%",
         marginTop: "34%",
         height: "150px",
         width: "250px",
         backgroundColor: "white"
      }}>
        <p style={{
          marginLeft: "4%",
          fontSize: "19px",
          fontFamily: 'Impact'
          }}>QUESTIONS LEFT: <br></br>  {circles} <br></br> CURRENT SCORE:</p>
          <p style={{
            marginTop: "-6%",
            marginLeft: "4%",
            fontSize: "40px",
            fontFamily: 'Impact',
            color: getColor(score)
            
          }}>  {score}</p>
      </div>

       
      

      { winner && (
      <div
      style={{
      position: "absolute",
       marginLeft: "-1%",
      marginTop: "-32%",
      height: "140px",
      width: "240px",
      backgroundColor: "gold",
      color: getColor
      }}
      > 
      <h1 style={{
            position: "absolute",
            left: "30px",
            top: "10px",
            fontSize: "45px",
            fontFamily: 'Impact'
        }}
        > score: {score} 🎉</h1>
      </div>
    )}


     { nextQuestion && (  
      <div
      style={{
      position: "absolute",
      marginLeft: "25%",
      marginTop: "-32%",
      height: "100px",
      width: "100px",
      backgroundColor: "lightgreen"
      }}
      > 
      <p style={{
            position: "absolute",
            left: "30px",
            top: "-22px",
            fontSize: "45px",
            fontFamily: 'Impact'
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
          top: "55%",
          left: "55%",
        }} 
      />
    </div>

    
   
  );
}

