import React from "react";

function Square({ value, onSquareClick, isWinning }) {
  const className = "square" + (isWinning ? " winning" : "");
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;