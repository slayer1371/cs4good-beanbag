import { useState } from 'react'
import "./assets/styles/index.css"
import PlayerTable from './assets/components/PlayerTable'
import ScoreForm from './assets/components/ScoreForm';
import RoundDisplay from './assets/components/RoundDisplay';
import GameGrid from './assets/components/GameGrid';

function App() {
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([
    {
      id:0,
      title: "Player 1",
      //array of scores for each round
      scores: [],
      //ease of access? Might not need
      totalScore: 0,
      
    },
    {
      id:1,
      title: "Player 2",
      scores: [],
      totalScore: 0,
      
    }
  ]);
  function resetGame(){
    setRound((prevValue)=>{
      return 0;
    })
    setPlayers((prevPlayers) => 
      prevPlayers.map((player) => {
        return {
          ...player,
          totalScore: 0, // Update total score
          scores: [], // Add the score to the scores array
        };
      })
    );
    //make players empty but keep number of players
  }
  function addPlayer(){
    setPlayers((prevValue)=>{
      var newId = prevValue.length;
      console.log("adding player");
      var adjustedScores = [];
      for(let x=0;x<round;x++){
        adjustedScores.push(0);
      }
      return(
        [...prevValue, 
        {
          id: newId,
          title: "Player " + String(newId+1),
          scores: adjustedScores,
          totalScore: 0,
        }
      ]
    )
    })
  }
  
  function removePlayer(){
    console.log("removing player");

    setPlayers((prevValue)=>{
      var newPlayerList = [...prevValue];
      newPlayerList.pop();
      return newPlayerList;
    })
  }

  function updateScores(newScores) {
    console.log("updating scores");
  
    setPlayers((prevPlayers) => 
      prevPlayers.map((player) => {
        const score = parseInt(newScores[player.title]) || 0; // Default to 0 if input is empty or invalid
        return {
          ...player,
          totalScore: player.totalScore + score, // Update total score
          scores: [...player.scores, score], // Add the score to the scores array
        };
      })
    );
  
    setRound((prevRound) => prevRound + 1); // Increment the round
  }
  

  return (
    <div>
      <RoundDisplay round = {round} resetGame = {resetGame}></RoundDisplay>
      <PlayerTable players = {players} addPlayer = {addPlayer} removePlayer = {removePlayer}></PlayerTable>
      <ScoreForm players = {players} updateScores = {updateScores}></ScoreForm>
      <GameGrid round = {round} players = {players}></GameGrid>
    </div>
    
  )
}

export default App
