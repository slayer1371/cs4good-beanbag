//serves to provide a form where the user can enter the scores for each player for the round and then hit a button that
// will update scores and trigger the next round.
import { useState } from "react";

function ScoreForm({ players, updateScores }) {
  const [scores, setScores] = useState(
    players.reduce((acc, player) => {
      acc[player.title] = ""; // Initialize each player's score as an empty string
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
    updateScores(scores); // Pass the scores to the App's updateScores function
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
            value={scores[player.title]} // Controlled input
            onChange={handleInputChange}
          />
        ))}
        <button type="submit">Update Scores</button>
      </form>
    </div>
  );
}

export default ScoreForm;
