import React from 'react';
import Square from './Square';
import { calculateWinner } from './CalculateWinner';

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Pass both the updated squares and the move location
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  let status;
  let winningLine = [];
  
  if (winnerInfo) {
    status = 'Winner: ' + winnerInfo.winner;
    winningLine = winnerInfo.winningLine;
  } else if (squares.every(square => square)) {
    // If every square is filled and no winner, it's a draw
    status = 'Draw: Game ended in a tie!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Create the board with two loops
  const board = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      // Check if this square is part of the winning line
      const isWinningSquare = winningLine && winningLine.includes(index);
      
      rowSquares.push(
        <Square 
          key={index} 
          value={squares[index]} 
          onSquareClick={() => handleClick(index)}
          isWinning={isWinningSquare}
        />
      );
    }
    board.push(<div key={row} className="board-row">{rowSquares}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default Board;