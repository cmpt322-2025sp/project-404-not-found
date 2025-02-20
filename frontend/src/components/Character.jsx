import React, { useEffect } from "react"
import bob from '../asset/images/bob.png'
import { character_dimension } from "../Const"

const Character = ({ position, movePlayer }) => {

    const handleKeyPress = (e) => {
        movePlayer(e.key)
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)
        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    return(
        <img 
            src={bob}
            alt="Bob"
            style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${character_dimension}px`,
                height: `${character_dimension}px`,
                objectFit: "cover",
                transition: "top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
                filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.1))",
                zIndex: 2
            }}
        />
    )

}

export default Character