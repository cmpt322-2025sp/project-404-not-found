import React from "react";

const Playground = ({ children }) => {
    return (
        <div style={playgroundWrapperStyle}>
            <div style={playgroundStyle}>
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
    // backgroundImage: ""
};

export default Playground;
