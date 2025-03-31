import { useEffect, useState } from "react";
import background from "../../asset/images/DontDrownBobBackground.png" 
import bridge from  "../../asset/images/bridge.png";
import logo from "../../asset/images/ddblogo.png";
import bob from "../../asset/images/bob2.png";
import Balloon from "./Balloon";
import Bob from "./Bob";

const DontDrownBob = () => {
     ///////////////////////////////////
    // Set up widget STATE
    const[objectData, setObjectData] = useState({
         left: 0,
    });
    // End set up widget STATE
    ///////////////////////////////////
 
    const [start,setStart] = useState(true);
   


   
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
                  position: "absolute",
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

                
                <Balloon id="1" left= "0"></Balloon>
                <Balloon id="2" left= "1"></Balloon>
                <Balloon id="3" left= "2"></Balloon> 
                <Balloon id="4" left= "3"></Balloon>
                <Balloon id="5" left= "4"></Balloon>
                <Balloon id="6" left= "5"></Balloon>
                <Balloon id="7" left= "6"></Balloon>
                <Balloon id="8" left= "7"></Balloon>
  
                <div style={{
                    backgroundImage: `url(${bridge})`,
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    bottom: "-85%",
                    left: "65%",
                    height: "120%",
                    width: "100%",
                 
        
                }}></div>

                {!start && <Bob x="10" y="50" nextX="15" nextY="20" />}
            
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