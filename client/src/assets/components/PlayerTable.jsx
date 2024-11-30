//serves to display the players at the top with the player name ie "Player 1" with the total score below

import { useState } from 'react'
import "../styles/index.css"
import Player from './Player'
import PlayerEdit from './PlayerEdit'
function PlayerTable(props){
    console.log(props.players)
    console.log(props.players[0])
    return(
        <div className = "player-container">
            {
                props.players.map((player,index)=>{
                    return(
                        <Player
                            className = "player"
                            key = {index} 
                            title = {player.title} 
                            totalScore = {player.totalScore}
                        ></Player>
                    );
                })
                
            }
            <PlayerEdit
            addPlayer = {props.addPlayer}
            removePlayer = {props.removePlayer}
            ></PlayerEdit>
        </div>
    );

}
export default PlayerTable;