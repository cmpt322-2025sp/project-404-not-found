import React from "react";

export default function Question({ x, y, color, emoji, onAnswerCheck }) {
  function handleClick() {
    const input = document.getElementById("answer");
    onAnswerCheck(input.value);
    input.value = "";
  }

  return (
    <div
      style={{
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1%",
        marginTop: "-7%",
        marginLeft: "-1.5%",
      }}
    >
      <h1>
        {emoji} {x} + {y}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input
          id="answer"
          type="text"
          placeholder="answer"
          style={{
            color: "purple",
            backgroundColor: "lightgrey",
          }}
        />
        <button
          style={{
            backgroundColor: "lightgreen",
          }}
          onClick={handleClick}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
