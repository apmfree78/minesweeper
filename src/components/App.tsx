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

// interface for full cell state
interface Cell {
  isFlagged: boolean; //true => cell is flagged, false => not flagged
  isRevealed: boolean; //true => cell is revealed, false => hidden
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}
type Cells = Cell[][];

// the game object creates the static game
let game: Board = new Board(Nx, Ny, difficulty);

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
  // cellState[x][y] contains the data on the state of cell at x,y
  // as defined in Cell interface :
  /*  interface Cell {
    isFlagged: boolean; //true => cell is flagged, false => not flagged
    isRevealed: boolean; //true => cell is revealed, false => hidden
    hasMine: boolean; // true => has a mine, false => no mine
    adjacentMines: number; // number of neighors that have a mine
  } */
  const [cellState, setCellState] = useState<Cells>(game.gameBoard);
  const [gameScore, setGameScore] = useState<number>(0);

  // reveals game cells after they are clicked by player
  // if there are no surrounding mines, then repeats this
  // process for neighboring cells, recursively
  function revealCell(x: number, y: number): void {
    // checking to make sure cell is not revealed
    if (!cellState[x][y].isRevealed) {
      // saving cell state
      const newCellState: Cells = JSON.parse(JSON.stringify(cellState));
      newCellState[x][y].isRevealed = true; //this cell is now revealed! :)
      game.revealedCells++; //increment number of revealed cells

      // checking if there is a mine
      if (cellState[x][y].hasMine) {
        // THERE IS A MINE
        // Player has LOST GAME
        playSound('bomb');
        setCellState(newCellState);
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
        // setTimeout(resetGame, 5000); //restart game
      } else {
        // no bomb found , PLEW!

        // play beeping sound
        // playSound('reveal');
        playSound('click2');

        //set neighboring cells that have no bombs to true
        // this function will change new game state with updated
        // state with all revealed cells (ie cells set to true)
        if (cellState[x][y].adjacentMines === 0)
          game.revealNeighbors(x, y, newCellState);
        setCellState(newCellState);

        // check if player has WON game
        // if total cells === total # of bombs + cells revealed, player has WON!
        if (
          game.totalCellCount() ===
          game.totalMineCount() + game.revealedCells
        ) {
          setGameScore(game.totalCellCount());

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
          setGameScore(game.revealedCells);
        }
      }
    }
  }

  function flagCell(x: number, y: number): void {
    // check to make sure cell is no revealed already,
    // because only hidden cells can be flagged
    if (!cellState[x][y].isRevealed) {
      //saving copy of flag state
      const newCellState: Cells = JSON.parse(JSON.stringify(cellState));

      //if cell is no flagged , flag it
      // if cell is already flag, unflag it
      if (!cellState[x][y].isFlagged) {
        newCellState[x][y].isFlagged = true;
        playSound('click');
        game.flaggedMines++; //increment number of flaggedMines
      } else {
        newCellState[x][y].isFlagged = false;
        game.flaggedMines--; //decrement number of flaggedMines
      }
      // update state
      setCellState(newCellState);
    }
  }

  // reset the board with default or user provided
  // custom dimensions and difficulty
  function resetGame(
    xdim: number = game.xDim,
    ydim: number = game.yDim,
    level: string = game.difficulty
  ): void {
    //generate new game
    game = new Board(xdim, ydim, level);
    // play start sound

    playSound('start');

    // reset game state with all cells hidden
    setCellState(game.gameBoard);
  }

  // play sound at start of game
  useEffect(() => {
    playSound('start');
  }, []);

  //deconstruct game state
  const { xHeight, yWidth, xDim, yDim } = game;

  return (
    <>
      <ScoreBoard width={yWidth}>
        <span style={{ paddingTop: 4 }}>SCORE: {gameScore}</span>
        <span style={{ paddingTop: 4 }}>
          MINES: {game.totalMineCount() - game.flaggedMines}
        </span>
        <button
          type='submit'
          style={{ borderWidth: 5, borderColor: '#CCC' }}
          onClick={() => resetGame()}>
          Restart Game
        </button>
      </ScoreBoard>
      <GameGrid height={xHeight} width={yWidth} xdim={xDim} ydim={yDim}>
        {cellState.map((rows, x) => {
          return (
            <>
              {rows.map((cell, y) => {
                return (
                  <GameCell
                    key={Math.random()}
                    x={x}
                    y={y}
                    cellState={cellState[x][y]}
                    revealCell={revealCell}
                    flagCell={flagCell}
                  />
                );
              })}
            </>
          );
        })}
      </GameGrid>
      <GameInputForm width={yWidth} resetGame={resetGame} />
    </>
  );
};

export default App;
