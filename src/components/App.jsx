import { useState } from 'react';
import Board from './Board';

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null }
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, nextLocation) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: nextLocation }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  // Create the moves list with location information
  let moves = history.map((step, move) => {
    // Calculate row and column for the move
    let description;
    let locationText = '';
    
    if (move > 0 && step.location !== null) {
      const row = Math.floor(step.location / 3) + 1;
      const col = (step.location % 3) + 1;
      locationText = ` (${row}, ${col})`;
    }
    
    if (move === currentMove) {
      description = move > 0
        ? `You are at move #${move}${locationText}`
        : 'You are at game start';
      return (
        <li key={move}>
          <span>{description}</span>
        </li>
      );
    }

    description = move > 0
      ? `Go to move #${move}${locationText}`
      : 'Go to game start';
      
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // If not ascending, reverse the moves array
  if (!isAscending) {
    moves = moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={toggleSortOrder}>
            Sort: {isAscending ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;