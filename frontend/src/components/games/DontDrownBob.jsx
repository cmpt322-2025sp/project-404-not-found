import { useEffect, useState } from "react";
import background from "../../asset/images/DontDrownBobBackground.png" 
import bridge from  "../../asset/images/bridge.png";
import logo from "../../asset/images/ddblogo.png";
import bob from "../../asset/images/bob2.png";
import Balloon from "./Balloon";
import Bob from "./Bob";
import GameOver from "../../asset/images/go.png"

const DontDrownBob = () => {
    

    //balloon data ////////////////////////////////////////////////////////////////////
    const [end, setEnd] = useState(false);
    const [death, setDeath] = useState(false);
    const [start,setStart] = useState(true);
    const xaxis = ["20%", "28%", "36%", "44%", "52%", "60%", "68%", "76%"];
    const [originalXs] = useState( [
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
    ] );
    const [originalYs] = useState( [
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 11),
    ] );
    //const correctAnswer = originalX - originalY;
    const [bobOnBalloon, setBobOnBalloon] = useState(1);
    const [score, setScore] = useState(0);
    /////////////////////////////////////////////////////////////////////////////////   
    
    const handleClick = () => {
        const inputValue = parseInt(document.getElementById("answer").value);

        console.log( "values: " + originalXs[bobOnBalloon] + ", " + originalYs[bobOnBalloon]);
        const correctAnswer = originalXs[bobOnBalloon-1] - originalYs[bobOnBalloon-1];
        console.log( "handleclick: " + inputValue + ", " + correctAnswer ); // Logs the value (you can use it elsewhere)

        if(correctAnswer === inputValue){
            console.log(":)");
            // setEnd(true);
            console.log( "bob on: " + bobOnBalloon );
            setBobOnBalloon( prevBobOnBalloon => prevBobOnBalloon + 1 );
            setScore(prevScore => prevScore + 12.5);
        }
        
    };

    // useEffect(() => {
    //     if (end || death) return; // Stop movement when the game ends
    //     const moveBalloon = () => {
    //         if(newY <= 40){
    //         setNewY(prevY => prevY + .01);
    //         } else{
    //             setDeath(true);
    //         }
    //     };
    //     const intervalId = setInterval(moveBalloon, 10);
    
    //     return () => clearInterval(intervalId);
    // }, [newY]); 

    console.log( "bob on ballone is " + bobOnBalloon );

    return (
        
        //BACKGROUND
         <div style={{
                  backgroundImage: `url(${background})`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  padding: "5%",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
        
                }}>
                
                
                <div style={{
                    backgroundImage: `url(${bridge})`,
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    bottom: "-85%",
                    left: "-15%",
                    height: "120%",
                    width: "100%",
                 
        
                }}></div>   

                
                <Balloon id="1" left= {xaxis[0]} originalX = {originalXs[0]} originalY = {originalYs[0]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="2" left= {xaxis[1]} originalX = {originalXs[1]} originalY = {originalYs[1]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="3" left= {xaxis[2]} originalX = {originalXs[2]} originalY = {originalYs[2]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="4" left= {xaxis[3]} originalX = {originalXs[3]} originalY = {originalYs[3]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="5" left= {xaxis[4]} originalX = {originalXs[4]} originalY = {originalYs[4]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="6" left= {xaxis[5]} originalX = {originalXs[5]} originalY = {originalYs[5]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="7" left= {xaxis[6]} originalX = {originalXs[6]} originalY = {originalYs[6]} bobOnBalloon = {bobOnBalloon}/>
                <Balloon id="8" left= {xaxis[7]} originalX = {originalXs[7]} originalY = {originalYs[7]} bobOnBalloon = {bobOnBalloon}/>
                
  
                <div style={{
                    backgroundImage: `url(${bridge})`,
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    bottom: "-85%",
                    left: "65%",
                    height: "120%",
                    width: "100%",
                 
        
                }}></div>

                {!start && <Bob x="5" y="60" nextX= {xaxis[0]-5} nextY="20" />}

                { !end && !death && (<input id="answer" style={{
                position: "absolute",
                left: "43%",
                bottom: "20%",
                width: "19%",
                height: "10%",
                fontSize: "18px"
                   

         }}></input> )}

            { !end && !death && (<button style={{ position: "absolute",
                left: "43%",
                bottom: "15%",
                width: "20%",
                height: "5%",
                fontSize: "13px",
                backgroundColor: "pink"
            }}  onClick={() => {handleClick()}
            }>SEND</button>)}

            
               {/* START SCREEN*/}.
                { start && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "5%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    backgroundColor: "#A5B68D",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div style={{
                        backgroundImage:`url(${logo})`,
                        position: "absolute",
                        backgroundRepeat: "no-repeat",
                        height: "40%",
                        width: "90%",
                        left: "30%",
                        top: "5%"

                    }}></div>
                    <h1 style={{position: "absolute", fontSize: "20px", width: "50%",left: "25%", top:"30%",  padding: "20px",backgroundColor: "beige"}}>
                        Make sure BOB doesn't drown! They need to get to the other platform before times up! They are jumping from balloon to ballon but they have to solve a math problem before jumping. Bob is on the hefty side so they need to be fast or they will drown😊</h1>

                    <p style={{position: "absolute",
                        left: "44%",
                        top: "45%",
                        fontSize: "45px"}}>⬇️⬇️⬇️⬇️
                    </p>

                     {/* left bob*/}.
            
                    <div style={{
                    position: "absolute",
                    backgroundImage: `url(${bob})`,
                    height: "440px",
                    width: "340px",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    top: "15%",
                    left: "3%"
                }}></div>

                 {/* right bob*/}.
                <div style={{
                    position: "absolute",
                    backgroundImage: `url(${bob})`,
                    height: "440px",
                    width: "340px",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    top: "15%",
                    left: "75%"
                }}></div>

                   <button style={{
                    position:"absolute",height: "20%",width: "40%", bottom:"20%", left:"30%", backgroundColor: "#F8ED8C", fontFamily: "papyrus", fontSize: "60px" 
                   }} onClick={() => setStart(false)}>START</button> 
                </div>)}
                

                </div>
        
        
            
    )
}

export default DontDrownBob