//serves to provide a form where the user can enter the scores for each player for the round and then hit a button that
// will update scores and trigger the next round.
import { useState } from "react";

function ScoreForm({ players, updateScores }) {
  // Initialize scores state with empty strings for all players
  const [scores, setScores] = useState(
    players.reduce((acc, player) => {
      acc[player.title] = ""; // Ensure every player's title has a corresponding score
      return acc;
    }, {})
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScores((prevScores) => ({
      ...prevScores,
      [name]: value, // Update the score for the corresponding player
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateScores(scores); // Pass scores to the parent
    setScores(
      players.reduce((acc, player) => {
        acc[player.title] = ""; // Reset scores after submission
        return acc;
      }, {})
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <input
            key={index}
            name={player.title}
            placeholder={`Enter score for ${player.title}`}
            value={scores[player.title] || ""} // Default to an empty string
            onChange={handleInputChange}
          />
        ))}
        <button type="submit">Update Scores</button>
      </form>
    </div>
  );
}

export default ScoreForm;
