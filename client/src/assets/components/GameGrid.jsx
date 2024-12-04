import { useState } from 'react'
import "../styles/index.css"

function GameGrid({ players, round }) {
    // Determine the maximum number of rounds from the players' scores arrays
    const maxRounds = Math.max(round-1, ...players.map((player) => player.scores.length));
  
    return (
      <div className="game-grid">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {Array.from({ length: maxRounds }, (_, index) => (
                <th key={index}>Round {index + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.title}</td>
                {Array.from({ length: maxRounds }, (_, roundIndex) => (
                  <td key={roundIndex}>
                    {player.scores[roundIndex] !== undefined ? player.scores[roundIndex] : "-"}
                  </td>
                ))}
                <td>{player.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default GameGrid;