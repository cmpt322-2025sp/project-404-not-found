import React from "react"
import Logout from "./Logout"

const ProgressBar = ({ scores }) => {
    const totalGames = Object.keys(scores).length
    const eggsCollected = Object.values(scores).filter(score => score > 0).length
    const eggsRemaining = totalGames - eggsCollected

    return (
        <div style={containerStyle}>
            <h4 style={titleStyle}>🌟 My Progress 🌟</h4>
            {Object.entries(scores).map(([game, score]) => (
                <div key={game} style={gameContainerStyle}>
                    <div style={labelStyle}>
                        <span>{game}</span>
                        <span>{score}/100</span>
                    </div>
                    <div style={progressBarBackgroundStyle}>
                        <div style={{
                            height: "100%",
                            width: `${score}%`,
                            backgroundColor: score > 50 ? "#4caf50":"#ffcc00",
                            borderRadius: "3px",
                            transition: "2s",
                            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)"
                        }}></div>
                    </div>
                    <div style={dividerStyle}></div>
                </div>
            ))}
            <div style={eggStyle}>
                {eggsRemaining > 0 && `Eggs Remaining: ${"🥚".repeat(eggsRemaining)}`}
            </div>
            <div style={dividerStyle}></div>
            <Logout/>
        </div>
    )
}

const containerStyle = {
    width: "100%",
    maxWidth: "180px",
    margin: "0 auto",
    padding: "8px",
    border: "3px solid #ffcc00",
    borderRadius: "10px",
    backgroundColor: "#ffeb99",
    position: "fixed",
    right: "10px",
    top: "30px",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center"
}

const titleStyle = {
    textAlign: "center",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#ff6600",
    fontWeight: "bold"
}

const gameContainerStyle = {
    marginBottom: "10px"
}

const labelStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3px",
    fontSize: "12px",
    color: "#333"
}
  
const progressBarBackgroundStyle = {
    height: "6px",
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: "3px",
    position: "relative",
    overflow: "hidden"
}

const dividerStyle = {
    height: "2px",
    backgroundColor: "#ffcc00",
    margin: "8px 0"
}

const eggStyle = {
    marginTop: "10px",
    fontSize: "14px",
    color: "#ff6600",
    fontWeight: "bold"
}

export default ProgressBar