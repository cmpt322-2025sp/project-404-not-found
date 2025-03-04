// import TestGame from "./components/games/TestGame";
import React, { useState } from "react"
import Playground from "./components/Playground"
import Character from "./components/Character"
import Egg from "./components/Egg"
import ProgressBar from "./components/ProgressBar"
import { character_speed, character_dimension, character_initial_position, island_positions } from "./Const"

const App = () => {

    // Score Data
    const [scores, setScores] = useState({
        "Game One": 40,
        "Grocery Store": 0,
        "Game Three": 0
    })
    const handleScoreFromEgg = (game, score) => {
        setScores((prevScores) => ({
          ...prevScores,
          [game]: score,
        }))
    }


    const getPixelPosition = (vw, vh) => {
        const widthInPixels = window.innerWidth;
        const heightInPixels = window.innerHeight;
    
        const topInPixels = (((vh+20) / 100) * heightInPixels);
        const leftInPixels = (((vw+15) / 100) * widthInPixels);
    
        return { top: topInPixels, left: leftInPixels };
    };

    const [character_position, setCharacterPosition] = useState(character_initial_position)

    const object_1_position = getPixelPosition(island_positions.redIsland.left, island_positions.redIsland.top)
    const [is_colliding_1, setIsCollidingWith1] = useState(false)
    const object_1 = { top: object_1_position.top, left: object_1_position.left, bottom: object_1_position.top + 20, right: object_1_position.left + 20 }

    const object_2_position = getPixelPosition(island_positions.greenIsland.left, island_positions.greenIsland.top)
    const [is_colliding_2, setIsCollidingWith2] = useState(false)
    const object_2 = { top: object_2_position.top, left: object_2_position.left, bottom: object_2_position.top + 20, right: object_2_position.left + 20 }

    const object_3_position = getPixelPosition(island_positions.yellowIsland.left, island_positions.yellowIsland.top)
    const [is_colliding_3, setIsCollidingWith3] = useState(false)
    const object_3 = { top: object_3_position.top, left: object_3_position.left, bottom: object_3_position.top + 20, right: object_3_position.left + 20 }

    const checkCollision = (newPosition) => {

        const character = {
            top: newPosition.top,
            left: newPosition.left,
            bottom: newPosition.top + character_dimension,
            right: newPosition.left + character_dimension,
        }

        const checkWithGivenObject = (object) => {
            if (
                character.top < object.bottom &&
                character.bottom > object.top &&
                character.left < object.right &&
                character.right > object.left
            ) {
                return true
            }
            return false
        }

        setIsCollidingWith1(checkWithGivenObject(object_1))
        setIsCollidingWith2(checkWithGivenObject(object_2))
        setIsCollidingWith3(checkWithGivenObject(object_3))
    }

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

            checkCollision(newPosition)
            return newPosition
        })
    }

    return (
        <Playground>
            <Character position={character_position} movePlayer={movePlayer} ></Character>
            {scores["Game One"] === 0 && (
                <Egg position={object_1_position} is_colliding={is_colliding_1} game="Game One" onScore={handleScoreFromEgg} />
            )}
            {scores["Grocery Store"] === 0 && (
                <Egg position={object_2_position} is_colliding={is_colliding_2} game="Grocery Store" onScore={handleScoreFromEgg} />
            )}
            {scores["Game Three"] === 0 && (
                <Egg position={object_3_position} is_colliding={is_colliding_3} game="Game Three" onScore={handleScoreFromEgg} />
            )}
            <ProgressBar scores={scores}></ProgressBar>
        </Playground>
    );
}

export default App;
