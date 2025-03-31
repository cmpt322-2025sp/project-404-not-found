import { useEffect, useState } from "react";
import red from "../../asset/images/balloons/red.png" 
import orange from "../../asset/images/balloons/orange.png" 
import yellow from "../../asset/images/balloons/yellow.png" 
import green from "../../asset/images/balloons/green.png" 
import blue from "../../asset/images/balloons/blue.png" 
import darkblue from "../../asset/images/balloons/darkblue.png" 
import purple from "../../asset/images/balloons/purple.png" 
import pink from "../../asset/images/balloons/pink.png" 

const Balloon = (props) => {

    const xaxis = ["20%", "28%", "36%", "44%", "52%", "60%", "68%", "76%"];
    const balloons= [red,orange, yellow, green,blue,darkblue,purple,pink];
    const [originalX] = useState(Math.floor(Math.random() * 11));
    const [originalY] = useState(Math.floor(Math.random() * 11));
    const [balloonIndex] = useState(() => Math.floor(Math.random() * balloons.length));
    const correctAnswer = originalX - originalY;
    const [end, setEnd] = useState(false);
    const [death, setDeath] = useState(false);
    const [newY, setNewY] = useState(5);
    const [stasisY] = useState(5);


    
    useEffect(() => {
        if (end || death) return; // Stop movement when the game ends
        const moveBalloon = () => {
            if(newY <= 40){
            setNewY(prevY => prevY + .01);
            } else{
                setDeath(true);
            }
        };
        const intervalId = setInterval(moveBalloon, 10);
    
        return () => clearInterval(intervalId);
    }, [newY]); 

    const handleClick = () => {
        const inputValue = parseInt(document.getElementById("answer").value);
        console.log(inputValue , correctAnswer ); // Logs the value (you can use it elsewhere)
        if(correctAnswer === inputValue){
            console.log(":)");
            setEnd(true);
            setNewY(stasisY);
        

        }
    };
    return(
    <div style={{
       backgroundImage: `url(${balloons[balloonIndex]})`,
    //    backgroundColor: "black",
    //    border: "thin solid white",
    //    borderColor: "pink",
        top: newY + "%",
        position: "absolute",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "354px",
        width: "125px",
        margin: "auto",
        left: xaxis[props.left],
        


    }}>
       { (!end && !death) && (<h1 style={{position: "relative", margin: "0 auto", textAlign: "center",top: "15%", color: "white" }}>{originalX} - {originalY}</h1>)}
       { end && (<h1 style={{ position: "relative", margin: "0 auto", textAlign: "center",top: "15%", color: "white" }}>✅</h1>)}
       { death && (<h1 style={{ position: "relative", margin: "0 auto", textAlign: "center",top: "15%", color: "white" }}>❌</h1>)}
       { !end && !death && (<input id="answer" style={{
                position: "absolute",
                left: "42%",
                bottom: "20%",
                width: "60%",
                height: "10%",
                fontSize: "18px"
                   

         }}></input> )}

            { !end && !death && (<button style={{ position: "absolute",
            left: "42%",
            bottom: "15%",
            width: "65%",
            height: "5%",
            fontSize: "13px",
            backgroundColor: "pink"
        }}  onClick={() => {handleClick()}
        }>SEND</button>)}


    </div> 
   
    );
}
export default Balloon;
