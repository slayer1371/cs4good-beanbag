//serves as the player element with a the name and score
import { useState } from 'react';

function Player(props){
    return(
        <div>
            <h1>{props.title}</h1>
            <h1>{props.totalScore}</h1>
        </div>
        
    )
}
export default Player;