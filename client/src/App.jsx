import { useState } from 'react'
import "./assets/styles/index.css"
import PlayerTable from './assets/components/PlayerTable'


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
      var newId = prevValue.length();
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
    setPlayers((prevValue)=>{
      return(
        prevValue.pop()
      )
    })
  }

  return (
    <div>
      <PlayerTable className="player-container" players = {players}></PlayerTable>
    </div>
    
  )
}

export default App
