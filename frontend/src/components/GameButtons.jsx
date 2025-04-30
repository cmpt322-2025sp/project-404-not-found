import React from "react";

const BUTTON_SIZE = 60;

const buttonStyle = {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: "50%",
  fontSize: "30px",
  border: "2px solid #fff",
  backgroundColor: "#66D2CE",
  color: "white" ,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  
};

const GameButtons = ({ movePlayer }) => (
  <div
    style={{
      position: "fixed",
      bottom: "10%",
      left: "85%",
      display: "grid",
      gridTemplateColumns: `repeat(3, ${BUTTON_SIZE}px)`,
      gridTemplateRows: `repeat(3, ${BUTTON_SIZE}px)`,
      gap: 0,
      pointerEvents: "auto",
    }}
  >
    <div />
    <button onClick={() => movePlayer("ArrowUp")} style={buttonStyle}>
    ▲
    </button>
    <div />

    <button onClick={() => movePlayer("ArrowLeft")} style={buttonStyle}>
    ◀
    </button>
    <div />
    <button onClick={() => movePlayer("ArrowRight")} style={buttonStyle}>
    ▶
    </button>

    <div />
    <button onClick={() => movePlayer("ArrowDown")} style={buttonStyle}>
    ▼
    </button>
    <div />
  </div>
);

export default GameButtons;
