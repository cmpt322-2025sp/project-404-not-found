const character_speed = 15
const character_dimension = 150
const character_initial_position = { top: 450, left: 900 }
const egg_dimension = 120

const island_positions = {"greenIsland":{top:-8,left:1}, "redIsland":{top:46,left:45}, "yellowIsland":{top:40,left:5}}

const PROCESSURL = process.env.REACT_APP_PROCESSURL;

export { 
    character_speed, 
    character_dimension, 
    character_initial_position, 
    egg_dimension, 
    island_positions,
    PROCESSURL
}