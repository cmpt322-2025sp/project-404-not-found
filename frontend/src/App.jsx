import TestGame from "./components/games/TestGame";
import React, { useState } from "react"
import Playground from "./components/Playground"
import Character from "./components/Character"
import { character_speed, character_dimension } from "./Const"

const App = () => {

  const [character_position, setCharacterPosition] = useState({ top: 500, left: 500 })

  const movePlayer = (direction) => {
      setCharacterPosition((prevPosition) => {
          const { innerWidth, innerHeight } = window
          const newPosition = { ...prevPosition }

          switch (direction) {
              case "ArrowUp":
                  if (prevPosition.top > 10) newPosition.top -= character_speed
                  break
              case "ArrowDown":
                  if (prevPosition.top < innerHeight - character_dimension - 10) newPosition.top += character_speed
                  break
              case "ArrowLeft":
                  if (prevPosition.left > 10) newPosition.left -= character_speed
                  break
              case "ArrowRight":
                  if (prevPosition.left < innerWidth - character_dimension - 10) newPosition.left += character_speed
                  break
              default:
                  break
          }

          return newPosition
      })
  }

  return (
    <Playground>
		<Character position={character_position} movePlayer={movePlayer} ></Character>
	</Playground>
  );
}

export default App;
