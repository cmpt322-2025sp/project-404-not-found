    import bob from "../../asset/images/bob2.png";
    import { useEffect, useState } from "react";

    const Bob = (props) => {
    const balloonXPositions = ['15','20','25','30','35','40','45','50'];   
    ///////////////////////////////////
    // Set up widget STATE
    const dx = parseFloat( props.nextX ) - parseFloat( props.x );
    const dy = parseFloat( props.nextY ) - parseFloat( props.y );
    // console.log( "dx, dy: " + dx +" "  + dy);
    const len = Math.sqrt( dx*dx + dy*dy );
    const unitDx = dx / len;
    const unitDy = dy / len;
    // console.log( "unit dx, dy: " + unitDx +" "  + unitDy);
    const[objectData, setObjectData] = useState({
        x: parseFloat(props.x),
        y: parseFloat(props.y),
        nextX: parseFloat(props.nextX), 
        nextY: parseFloat(props.nextY),
        deltaX: unitDx,
        deltaY: unitDy
   });
   // End set up widget STATE
   ///////////////////////////////////

   useEffect(() => {
    
    const moveBob = () => {


        if( objectData.deltaX > 0 ) { // moving to the right
            if( objectData.x >= objectData.nextX ) {  // have we reached or passed the destination
                return; // stop moving
            }
        }

        // console.log( "here: " + objectData.x +" "  + objectData.deltaX );
        const newX = objectData.x + objectData.deltaX;
        const newY = objectData.y + objectData.deltaY;
        // console.log( "move bob to " + newX + ", " + newY);
            setObjectData({
                x: newX,
                y: newY,
                nextX: objectData.nextX, 
                nextY: objectData.nextY,
                deltaX: objectData.deltaX,
                deltaY: objectData.deltaY
            });
            // console.log( "here:" + objectData.x , objectData.y);
        };

    const intervalId = setInterval(moveBob, 20);
    return () => { clearInterval(intervalId); };
   });

    return(    
    <div style={{
        position: "absolute",
        backgroundImage: `url(${bob})`,
        height: "240px",
        width: "140px",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        left: objectData.x + "%",
        top: objectData.y + "%",
    }}>

        
    </div>);
    

}
export default Bob;