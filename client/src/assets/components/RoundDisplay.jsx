import { useState } from 'react'
import "../styles/index.css"

function RoundDisplay(props){
    return(
        <div className = "gen-row">
            <h1>Round: {props.round}</h1>
            <button type="button" onClick = {props.resetGame}>RESET GAME</button>
        </div>
    )
}
export default RoundDisplay