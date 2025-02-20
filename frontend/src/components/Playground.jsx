import React from "react"
import green_island from "../asset/images/green_island.png"
import red_island from "../asset/images/red_island.png"
import yellow_island from "../asset/images/yellow_island.png"
import { island_positions } from "../Const"

const Playground = ({ children }) => {
    return (
        <div style={playgroundWrapperStyle}>
            <div style={playgroundStyle}>
                <img
                    id="greenIsland"
                    src={green_island}
                    alt="Green Island"
                    className="island-image"
                    style={{ top: `${island_positions.greenIsland.top}vh`, left: `${island_positions.greenIsland.left}vw` }}
                />
                <img
                    id="redIsland"
                    src={red_island}
                    alt="Red Island"
                    className="island-image"
                    style={{ top: `${island_positions.redIsland.top}vh`, left: `${island_positions.redIsland.left}vw` }}
                />
                <img
                    id="yellowIsland"
                    src={yellow_island}
                    alt="Yellow Island"
                    className="island-image"
                    style={{ top: `${island_positions.yellowIsland.top}vh`, left: `${island_positions.yellowIsland.left}vw` }}
                />
                {children}
            </div>
        </div>
    );
};

const playgroundWrapperStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

const playgroundStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    // backgroundColor: "skyblue"
    background: `
        linear-gradient(90deg, rgba(0, 191, 255, 0.5) 25%, rgba(30, 144, 255, 0.5) 50%, rgba(0, 191, 255, 0.5) 75%), 
        linear-gradient(90deg, rgba(0, 191, 255, 0.5) 25%, rgba(30, 144, 255, 0.5) 50%, rgba(0, 191, 255, 0.5) 75%)
    `, // Blue gradient
    backgroundSize: "200% 100%", // Makes the gradient large enough to animate
    animation: "flowingWater 3s ease infinite", // Animation to move the gradient
};

const style = `
    .island-image {
        width: 40vw;
        height: auto;
        position: absolute;
        filter: "drop-shadow(0px 40px 60px rgba(0, 0, 0, 1)) drop-shadow(0px 30px 50px rgba(0, 0, 0, 1))",
    }

    @keyframes flowingWater {
        0% {
            background-position: 0% 0%, 100% 0%;
        }
        50% {
            background-position: 50% 0%, 150% 0%;
        }
        100% {
            background-position: 100% 0%, 200% 0%;
        }
    }
`;

if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}

export default Playground;
