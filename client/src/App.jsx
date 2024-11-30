import { useState } from 'react'
import "./assets/styles/index.css"
import PlayerTable from './assets/components/PlayerTable'
import ScoreForm from './assets/components/ScoreForm';


function App() {
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
  
  function addPlayer(){
    setPlayers((prevValue)=>{
      var newId = prevValue.length;
      console.log("adding player");
      return(
        [...prevValue, 
        {
          id: newId,
          title: "Player " + String(newId+1),
          scores: [],
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

  function updateScores(newScores){
    console.log("updating scores")

    setPlayers((prevValue)=>{
      var newPlayerList = [...prevValue];
      newPlayerList.map((player, index)=>{
        if(newScores[player.title] != ""){
          newPlayerList[index].totalScore += parseInt(newScores[player.title]);
        }
      })
      return newPlayerList;
    })
  }

  return (
    <div>
      <PlayerTable className="player-container" players = {players} addPlayer = {addPlayer} removePlayer = {removePlayer}></PlayerTable>
      <ScoreForm players = {players} updateScores = {updateScores}></ScoreForm>
    </div>
    
  )
}

export default App
