import React, { useRef, useEffect } from "react";

export default function Question({ x, y, color, emoji, onAnswerCheck }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    const val = inputRef.current?.value ?? "";
    onAnswerCheck(val);
    if (inputRef.current) {
      inputRef.current.value = "";  // clear
      inputRef.current.focus();     // and re-focus
    }
  };

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

      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          ref={inputRef}
          type="number"
          placeholder="answer"
          autoFocus          /* <- initial focus */
          onKeyDown={(e) => e.key === "Enter" && submit()}
          style={{
            color: "purple",
            backgroundColor: "lightgrey",
            width: 150,
            textAlign: "center",
          }}
        />
        <button
          onClick={submit}
          style={{ backgroundColor: "lightgreen", marginLeft: 6 }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
