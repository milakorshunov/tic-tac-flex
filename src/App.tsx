import React, { useRef, useState } from 'react';
import Board from './components/Board/Board';

function App() {
  type GameState = 'Active' | 'Victory' | 'Tie';

  const [boardSize, setBoardSize] = useState<number>(3);
  const [victorySize, setVictorySize] = useState<number>(3);
  const boardSizeRef = useRef<HTMLInputElement>(null);
  const victorySizeRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<string[]>(Array(boardSize * boardSize).fill(''));
  const [symbol, setSimbol] = useState("X");
  const [state, setState] = useState<GameState>("Active");
  
  function handleClick(i: number) {

    if (data[i] === '' && state === 'Active') {
      const newDataArray = [...data];
      newDataArray[i] = symbol;
      setData(newDataArray);

      if (checkVictory(newDataArray)) {
        setState("Victory");

      } else if (newDataArray.every((cell) => cell !== "")) {
        setState("Tie");

      } else {
        setSimbol(symbol === 'X' ? "O" : "X");
      }
    }

  }

  function checkVictory(newData: string[]) {
    const checkDirection = (x: number, y: number, dx: number, dy: number) => {
      let count = 0;
      let i = x;
      let j = y;

      while (i >= 0 && i < boardSize && j >= 0 && j < boardSize && newData[i * boardSize + j] === symbol) {
        count++;
        if (count === victorySize) return true;
        i += dx;
        j += dy;
      }
      return false;
    };

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (newData[i * boardSize + j] === symbol) {
          if (
            checkDirection(i, j, 1, 0) || // vertical 
            checkDirection(i, j, 0, 1) || // horizontal
            checkDirection(i, j, 1, 1) || // diagonal down-right
            checkDirection(i, j, 1, -1) // diagonal down-left
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function showMessage() {
    var message = '';
    if (state === "Victory") {
      message = ` It is a Victory for ${symbol}`;
    } else if (state === 'Tie') {
      message = "It is Tie";
    } else {
      message = `${symbol} is playing`;

    }
    return message;
  }

  function resetBoard() {
    const newBoardSize = Math.max(parseInt(boardSizeRef.current?.value || '3'), 1);
    const newVictorySize = Math.max(parseInt(victorySizeRef.current?.value || '3'), 1);
  
    if (newVictorySize > newBoardSize) {
      
      if (victorySizeRef.current) {
        victorySizeRef.current.value = newBoardSize.toString(); // Reset the input value
      }
    }

    setVictorySize(newVictorySize);
    setBoardSize(newBoardSize);
  
    setData(Array(boardSize * boardSize).fill(''));
    setSimbol("X");
    setState("Active");
  }

  return (
    <div className='container' >

      <h1 >{showMessage()}</h1>

     <Board boardSize={boardSize} data={data} symbol={symbol} handleClick={handleClick}/> 

      <div style={{textAlign: 'center'}}>
        <label style={{paddingRight: '10px'}}>Board Size: </label>
        <input type="number" defaultValue={boardSize} ref={boardSizeRef}></input>

        <label> Victory Size: </label>
        <input type="number" defaultValue={victorySize} ref={victorySizeRef}></input>
      </div>

      <button type="button" className="button" onClick={() => resetBoard()}>Reset the game</button>

    </div>
  );
}

export default App;
