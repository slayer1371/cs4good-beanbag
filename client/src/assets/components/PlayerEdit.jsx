import { useState } from 'react'
import "../styles/index.css"

function PlayerEdit(props){
    return(
        <div>
            <button type="button" onClick= {props.addPlayer}>Add Player</button>
            <button type="button" onClick= {props.removePlayer}>Remove Player</button>
        </div>
    )
}
export default PlayerEdit