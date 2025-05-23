import { useEffect, useState } from "react";
import red from "../../asset/images/balloons/red.png"; 
import orange from "../../asset/images/balloons/orange.png"; 
import yellow from "../../asset/images/balloons/yellow.png"; 
import green from "../../asset/images/balloons/green.png"; 
import blue from "../../asset/images/balloons/blue.png"; 
import darkblue from "../../asset/images/balloons/darkblue.png"; 
import purple from "../../asset/images/balloons/purple.png"; 
import pink from "../../asset/images/balloons/pink.png"; 

const Balloon = (props) => {
    const balloons = [red, orange, yellow, green, blue, darkblue, purple, pink];
    const [balloonIndex] = useState(() => Math.floor(Math.random() * balloons.length));
    const [correct, setCorrect] = useState(false);
    // State for the y-position of the balloon
    const [newY, setNewY] = useState(5);
    const [stasisY] = useState(5);
    const originalX = props.originalX;
    const originalY = props.originalY;
    const [bobOnBalloon, setBobOnBalloon] = useState( props.bobOnBalloon == props.id);

//    console.log( "5here: " + props.id + ", " + bobOnBalloon + ", " + props.bobOnBalloon);

    useEffect( () => {
        console.log( "bob changed" );
        setBobOnBalloon( props.bobOnBalloon == props.id );
    }, [props.bobOnBalloon] );

    // Use effect to update the y-position over time
    useEffect(() => {
    
        const interval = setInterval(() => {
            if(bobOnBalloon){
                if (newY < 40) { // Adjust when to stop updating
                    setNewY(prevY => prevY + 0.05); // Increment Y-position
                    // console.log(newY);
                } else {
                    props.gameOver();
                }
            }
            else {
                if (newY > stasisY) { // Adjust when to stop updating
                    setNewY(prevY => prevY - 0.5); // Increment Y-position
                    setCorrect(true);
                }
            }
        }, 20 );
        return () => clearInterval( interval );
    }, [newY, bobOnBalloon] );

    return (
        <div
            style={{
                backgroundImage: `url(${balloons[balloonIndex]})`,
                position: "absolute",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "354px",
                width: "125px",
                left: props.left + "%",
                top: newY + "%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                fontSize: "24px"
            }}
        >
           {!correct && <h1 style={{  position: "absolute", fontSize: "30px" , top: "10%", alignContent: "center"}}>{originalX} &#8722; {originalY}</h1>}
           {correct && <h1 style={{ position: "absolute", fontSize: "30px" , top: "10%",  alignContent: "center"}}>✅</h1>}
              </div>
    );
};

export default Balloon;
