import React from "react"
import EggObject from "../asset/images/egg_object.png"
import { egg_dimension } from "../Const"

const Egg = ({ position, is_colliding }) => {

    return (
        <>
            <img 
                src={EggObject} 
                alt="Egg"
                style={{
                    position: "fixed",
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    height: `${egg_dimension}px`,
                    width: `${egg_dimension}px`,
                    transform: is_colliding ? 'scale(1.5)' : 'scale(1.0)' ,
                    filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.1))",
                    transition: "0.5s",
                }}
            />
        </>
    )

}

export default Egg