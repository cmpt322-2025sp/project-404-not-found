import React, { useState } from "react"
import EggObject from "../asset/images/egg_object.png"
import { egg_dimension } from "../Const"
import Modal from 'react-modal';

import TestGame from "./games/TestGame"
import GrocerySelection from "./games/GrocerySelection"
import BobCleans from "./games/BobCleans"

const Egg = ({ position, is_colliding, game, onScore }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handlePlayButtonClick = () => {
        setIsPopupOpen(true)
    }
    const handleClosePopup = () => {
        setIsPopupOpen(false)
    }

    const handleScoreSubmission = (gameScore) => {
        setIsPopupOpen(false)
        onScore(game, gameScore)
    }

    let gameTitle = game

    const renderGame = () => {
        switch (game) {
            case 'Game One':
                return <p>NO GAMES ATTACHED</p>
            case 'Grocery Store':
                return <GrocerySelection onScoreSubmission={handleScoreSubmission}></GrocerySelection>
            case 'Bob Cleans':
                return <BobCleans onScoreSubmission={handleScoreSubmission}></BobCleans>
            default:
                return null
        }
      }

      return (
        <>
            <div style={{
                position: "fixed",
                top: `${position.top - 30}px`,
                left: `${position.left + egg_dimension / 2 - 50}px`,
                display: is_colliding ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center', 
                backgroundColor: 'yellow',
                padding: '10px',
                borderRadius: '8px',
                zIndex: 2
            }}>
                <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    margin: '0px 10px',
                }}>
                    {gameTitle}
                </div>
                <button 
                    style={{
                        backgroundColor: 'darkred',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        color: 'white',
                        cursor: 'pointer',
                        margin: '0px 10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.2s, background-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={handlePlayButtonClick}
                >
                    Play
                </button>
            </div>
    
            <img 
                src={EggObject} 
                alt="Egg"
                style={{
                    position: "fixed",
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    height: `${egg_dimension}px`,
                    width: `${egg_dimension}px`,
                    transform: is_colliding ? 'scale(1.5)' : 'scale(1.0)',
                    filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.1))",
                    transition: "0.5s"
                }}
            />

            <Modal 
                isOpen={isPopupOpen}
                onRequestClose={handleClosePopup}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 3,
                    },
                    content: {
                        position: 'absolute',
                        padding: '0px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '85vw',
                        height: '85vh',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
            >
                <div style={titleBarStyles}>
                    <span style={{fontSize: '18px', fontWeight: 'bold'}}>{gameTitle}</span>
                    <button 
                        onClick={handleClosePopup} 
                        style={closeButtonTitleBarStyles}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >❌</button>
                </div>
                <div style={{flex: 1, overflowY: 'auto', position: 'relative'}}>
                    {renderGame()}
                </div>
            </Modal>


        </>
    )

}

const titleBarStyles = {
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
}

const closeButtonTitleBarStyles = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    transition: '0.2s'
}

export default Egg