import Square from "./square";
import Result from "./Result";
import GoBackBtn from "./GoBacKBtn";
import { useState } from "react"; // state is private to the component that defines it.

let isPlayerOne = true; // To change between player X and O
let isGameOver = false;
let winner = null;

export default function Board() {
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  ); /* Used useState hook to remember 
    which squares have been filled and with what value */
  const [moveHistory, setMoveHistory] = useState([]);

  function clickHandler(i) {
    if (!isGameOver) {
      const nextSquares = squares.slice();
      if (nextSquares[i] == null) {
        nextSquares[i] = isPlayerOne ? "X" : "O";
        setSquares(nextSquares);
        isPlayerOne = !isPlayerOne;
        winner = findWinner(nextSquares);
        moveHistory.push(i);
        setMoveHistory(moveHistory);
        console.log(moveHistory);
        if (winner != null) {
          isGameOver = !isGameOver;
        }
      } // this check will not re-render the board if the value for the clicked square is already set
    }
  }

  function backBtnClickHandler(goBackBtnIndex) {
    const nextSquares = squares.slice();
    const moveHistoryCopy = moveHistory.slice();
    for (let i = goBackBtnIndex; i < nextSquares.length; i++) {
        nextSquares[moveHistory[i]] = null;
    }
    for (let i = goBackBtnIndex; i < moveHistoryCopy.length; i++) {
        moveHistory.pop();
    }
    setSquares(nextSquares);
    if (winner != null) {
        winner = null;
        isGameOver = !isGameOver;
    }
  }
  let displayResult = null;
  let displayGoBackBtn = moveHistory.length ? <span>Go To Move : </span> : null;
  for (let index = 0; index < moveHistory.length; index++) {
        displayGoBackBtn = <>
        {displayGoBackBtn}
        <GoBackBtn value={index} onClick={() => backBtnClickHandler(index)}/>
    </>;
  }
  let DisplayBoard = (
    <>
      {" "}
      <h2 className="header">Tic-Tac-Toe</h2>
      <br />
      <div className="board">
        <Square value={squares[0]} onClick={() => clickHandler(0)} />
        <Square value={squares[1]} onClick={() => clickHandler(1)} />
        <Square value={squares[2]} onClick={() => clickHandler(2)} />
        <br />
        <Square value={squares[3]} onClick={() => clickHandler(3)} />
        <Square value={squares[4]} onClick={() => clickHandler(4)} />
        <Square value={squares[5]} onClick={() => clickHandler(5)} />
        <br />
        <Square value={squares[6]} onClick={() => clickHandler(6)} />
        <Square value={squares[7]} onClick={() => clickHandler(7)} />
        <Square value={squares[8]} onClick={() => clickHandler(8)} />
        <br />
        <br />
      </div>
        {displayGoBackBtn}
    </>
  );
  if (winner != null) {
    displayResult = <Result value={winner} />;
  }
  // value, and onClick function are passed as props of the Square component.
  return (
    <>
      {DisplayBoard}
      {displayResult}
    </>
  );
}

/**
 * params: useState variable which is an array containing values of the square.
 * function to find the winner.
 */
function findWinner(squares) {
  let isDraw = true;
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < winCases.length; index++) {
    const [a, b, c] = winCases[index];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  for (let index = 0; index < squares.length; index++) {
    if (squares[index] == null) isDraw = false;
  }
  if (isDraw) {
    return "Draw";
  }
  return null;
}
