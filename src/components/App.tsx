import React, { useEffect, useState } from 'react';
import Board from './gameBoard';
import Swal from 'sweetalert2';
import GameCell from './GameCell';
import { playSound } from '../library/sounds';
import { GameInputForm } from './GameInputForm';
import { ScoreBoard, GameGrid } from '../library/gameStyled';

//initial default values size of board , Nx x Ny
const Nx: number = 15;
const Ny: number = 20;
const difficulty: string = 'easy'; // diffculting of game, determines % of mines

// the gameBoard object creates the static gameBoard
let gameBoard: Board = new Board(Nx, Ny, difficulty);
type Game = boolean[][];

// interface for full cell state
interface CellProp {
  isFlagged: boolean; //true => cell is flagged, false => not flagged
  isRevealed: boolean; //true => cell is revealed, false => hidden
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}
// its contains the following functions
/* 
  // define methods
  // return of location x, y has a bomb
  hasMine(x: number, y: number): boolean
 
  // return initial state of game, NxN boolean matrix
  // if cell is hidden => false, if cell is visible => true
  // because this is initial state all cells are FALSE (hidden)
  getInitialState(): boolean[][]

  // number of adjacent cells that contain mines
  adjacentMines(x: number, y: number): number 

  // total number of mines on the board
  totalMineCount() 

 // recursive function to reveal each neighor that does not contain
  // a bomb. Neighbors are ALL surround cells
  revealNeighbors(i: number, j: number, state: Game, boardState: Board): void 

 */

const App: React.FC = () => {
  // gameState[x][y] is true if that game cell is revealed, false if it's hidden
  const [gameState, setGameState] = useState<Game>(gameBoard.getInitialState());
  // cellFlagged[x][y] is true if the game cell is flagged by player as potential mine
  // cellFlagged[x][y] is false if game cell is not flagged
  const [cellFlagged, setCellFlagged] = useState<Game>(
    gameBoard.getInitialState()
  );
  const [gameScore, setGameScore] = useState<number>(0);

  // reveals game cells after they are clicked by player
  // if there are no surrounding mines, then repeats this
  // process for neighboring cells, recursively
  function revealCell(x: number, y: number): void {
    // checking to make sure cell is not revealed
    if (!gameState[x][y]) {
      // saving cell state
      const newGameState = JSON.parse(JSON.stringify(gameState));
      newGameState[x][y] = true; //this cell is now revealed! :)
      gameBoard.revealedCells++; //increment number of revealed cells

      // checking if there is a mine
      if (gameBoard.hasMine(x, y)) {
        // THERE IS A MINE
        // Player has LOST GAME
        playSound('bomb');
        setGameState(newGameState);
        setGameScore(0);

        // message
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'BOOM! EXPLOSION',
          text: `Please Try Again!!`,
          showDenyButton: true,
          denyButtonText: 'Restart Game',
          timer: 10000,
        }).then((result) => {
          if (result.isDenied) resetGame();
        });
        // pop up alert that game is lost
        // sound
        setTimeout(() => playSound('lost'), 1000);
        setTimeout(resetGame, 5000); //restart game
      } else {
        // no bomb found , PLEW!
        // revealing cell
        newGameState[x][y] = true;
        // play beeping sound
        playSound('reveal');

        //set neighboring cells that have no bombs to true
        // this function will change new game state with updated
        // state with all revealed cells (ie cells set to true)
        if (gameBoard.adjacentMines(x, y) === 0)
          gameBoard.revealNeighbors(x, y, newGameState);
        setGameState(newGameState);

        // check if player has WON game
        // if total cells === total # of bombs + cells revealed, player has WON!
        if (
          gameBoard.totalCellCount() ===
          gameBoard.totalMineCount() + gameBoard.revealedCells
        ) {
          setGameScore(gameBoard.totalCellCount());

          // Player has won, success message + sound
          // sound
          playSound('win');
          // message
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'CONGRADULATIONS',
            text: `YOU WON!! SCORE: ${gameScore}`,
            showDenyButton: true,
            denyButtonText: 'Play Again',
            timer: 10000,
          }).then((result) => {
            if (result.isDenied) resetGame();
          });
          setTimeout(resetGame, 3000); //restart game
        } else {
          // update score
          setGameScore(gameBoard.revealedCells);
        }
      }
    }
  }

  function flagCell(x: number, y: number): void {
    // check to make sure cell is no revealed already,
    // because only hidden cells can be flagged
    if (!gameState[x][y]) {
      //saving copy of flag state
      const cellFlagState = JSON.parse(JSON.stringify(cellFlagged));

      //if cell is no flagged , flag it
      // if cell is already flag, unflag it
      if (!cellFlagged[x][y]) {
        cellFlagState[x][y] = true;
      } else cellFlagState[x][y] = false;

      // update state
      setCellFlagged(cellFlagState);
    }
  }

  // reset the board with default or user provided
  // custom dimensions and difficulty
  function resetGame(
    xdim: number = gameBoard.xDim,
    ydim: number = gameBoard.yDim,
    level: string = gameBoard.difficulty
  ): void {
    //generate new gameboard
    gameBoard = new Board(xdim, ydim, level);
    // play start sound

    playSound('start');

    // reset game state with all cells hidden
    setGameState(gameBoard.getInitialState());
    setCellFlagged(gameBoard.getInitialState());
  }

  // play sound at start of game
  useEffect(() => {
    playSound('start');
  }, []);

  //deconstruct gameboard state
  const { xHeight, yWidth, xDim, yDim } = gameBoard;

  return (
    <>
      <ScoreBoard width={gameBoard.yWidth}>
        <span style={{ paddingTop: 4 }}>SCORE: {gameScore}</span>
        <span style={{ paddingTop: 4 }}>
          MINES: {gameBoard.totalMineCount()}
        </span>
        <button
          type='submit'
          style={{ borderWidth: 5, borderColor: '#CCC' }}
          onClick={() => resetGame()}>
          Restart Game
        </button>
      </ScoreBoard>
      <GameGrid height={xHeight} width={yWidth} xdim={xDim} ydim={yDim}>
        {gameState.map((rows, x) => {
          return (
            <>
              {rows.map((cell, y) => {
                //extracting cell state
                const cellState: CellProp = {
                  isRevealed: gameState[x][y],
                  isFlagged: cellFlagged[x][y],
                  hasMine: gameBoard.hasMine(x, y),
                  adjacentMines: gameBoard.adjacentMines(x, y),
                };

                return (
                  <GameCell
                    key={Math.random()}
                    x={x}
                    y={y}
                    cellState={cellState}
                    revealCell={revealCell}
                    flagCell={flagCell}
                  />
                );
              })}
            </>
          );
        })}
      </GameGrid>
      <GameInputForm width={gameBoard.yWidth} resetGame={resetGame} />
    </>
  );
};

export default App;
