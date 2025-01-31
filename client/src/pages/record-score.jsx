import React, { useState } from 'react';

function ScoreScreen() {
  // Track editing state and team name
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamName, setTeamName] = useState('Team A');

  // Fake scores array
  const scores = [0, 1, 2, 3, 4, 5];

  const handleEditClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    // Prevent page refresh
    e.preventDefault();
    setIsEditingName(false);
  };

  return (
    <div style={styles.container}>
      {/* Team Name + Edit button (or icon) */}
      {isEditingName ? (
        <form onSubmit={handleNameSubmit} style={styles.nameForm}>
          <input
            style={styles.nameInput}
            type="text"
            value={teamName}
            onChange={handleNameChange}
            autoFocus
          />
          <button type="submit" style={styles.saveButton}>Save</button>
        </form>
      ) : (
        <div style={styles.headerRow}>
          <h1 style={styles.teamName}>{teamName}</h1>
          <button onClick={handleEditClick} style={styles.editButton}>
            Edit
          </button>
        </div>
      )}

      {/* Title: "Record Score" */}
      <h2 style={styles.subtitle}>Record Score</h2>

      {/* Grid of scores + plus button */}
      <div style={styles.grid}>
        {scores.map((score) => (
          <div key={score} style={styles.scoreBox}>
            <span style={styles.scoreNumber}>{score}</span>
            {/*Can Add score functionality by editing button*/}
            <button style={styles.plusButton}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles (simplistic for demo purposes)
const styles = {
    container: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px',
      border: '2px solid gold',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      backgroundColor: 'blue',
      color: 'gold', // Ensures text appears in gold
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    teamName: {
      margin: '0 10px 0 0',
    },
    editButton: {
      padding: '6px 10px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      backgroundColor: 'gold',
      color: 'blue',
      border: 'none',
      borderRadius: '4px',
    },
    nameForm: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '10px',
    },
    nameInput: {
      fontSize: '1.2rem',
      padding: '4px 8px',
      backgroundColor: 'white',
      border: '2px solid gold',
      color: 'black',
      borderRadius: '4px',
    },
    saveButton: {
      padding: '6px 10px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      backgroundColor: 'gold',
      color: 'blue',
      border: 'none',
      borderRadius: '4px',
    },
    subtitle: {
      margin: '20px 0 10px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '20px',
    },
    scoreBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid gold',
      borderRadius: '4px',
      padding: '10px',
      backgroundColor: 'blue',
      color: 'gold',
    },
    scoreNumber: {
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
    plusButton: {
      fontSize: '1rem',
      padding: '6px 10px',
      cursor: 'pointer',
      backgroundColor: 'gold',
      color: 'blue',
      border: 'none',
      borderRadius: '4px',
    },
  };
  

export default ScoreScreen;
