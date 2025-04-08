import bob from "../../asset/images/bob2.png";
import { useEffect, useState } from "react";

const Bob = (props) => {
    ///////////////////////////////////
    // Set up widget STATE
    const dx = parseFloat(props.nextX) - parseFloat(props.x);
    const dy = parseFloat(props.nextY) - parseFloat(props.y);
    const len = Math.sqrt(dx * dx + dy * dy);
    const unitDx = dx / len;
    const unitDy = dy / len;

    const [objectData, setObjectData] = useState({
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
        // Ensure that Bob only moves if the nextX, nextY has changed
        if (objectData.x === objectData.nextX && objectData.y === objectData.nextY) return; // Stop if already at target

        const moveBob = () => {
            // If Bob has reached or passed the destination, stop moving
            if (objectData.deltaX > 0 && objectData.x >= objectData.nextX) {
                return;
            }

            // Calculate new position
            const newX = objectData.x + objectData.deltaX;
            const newY = objectData.y + objectData.deltaY;

            // Update object data with new position
            setObjectData((prevState) => ({
                ...prevState,
                x: newX,
                y: newY
            }));
        };

        
        // Set up the interval to move Bob every 20ms
        const intervalId = setInterval(moveBob, 20);
        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [objectData]); // The useEffect now depends on objectData

    return (
        <div
            style={{
                position: "absolute",
                backgroundImage: `url(${bob})`,
                height: "240px",
                width: "140px",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                left: objectData.x + "%",
                top: objectData.y + "%",
            }}
        >
        </div>
    );
};

export default Bob;
