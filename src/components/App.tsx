import React, { useState, ChangeEvent, useEffect } from 'react';
import Board from './gameBoard';
import styled, { StyledComponent } from 'styled-components';
import Swal from 'sweetalert2';
import GameCell from './GameCell';
import uuid from 'react-native-uuid';

//size of board , Nx x Ny
const Nx: number = 15;
const Ny: number = 20;
const difficulty: string = 'easy'; // diffculting of game, determines % of mines

// the gameBoard is that create the gameBoard
// this contains following functions
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
let gameBoard: Board = new Board(Nx, Ny, difficulty);
type Game = boolean[][];

// styled component for the game board, using CSS grid
// with dynamic values
const GameGrid: StyledComponent<'div', any, {}, never> = styled.div`
  background-color: #ccc;
  width: ${gameBoard.yWidth}vmin;
  height: ${gameBoard.xHeight}vmin;
  display: grid;
  grid-template-rows: repeat(${Nx}, 1fr);
  grid-template-columns: repeat(${Ny}, 1fr);
`;

// score board shows the score, # of mines, and button to restart game
const ScoreBoard: StyledComponent<'div', any, {}, never> = styled.div`
  /* background-color: #ccc; */
  padding: 7px 0px 5px 0px;
  margin-bottom: 10px;
  border: 5px solid aqua;
  color: orange;
  font-size: 24px;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<Game>(gameBoard.getInitialState());
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

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
        // Player has LOST GAME
        setGameOver(true);
        setGameState(newGameState);
        setGameScore(0);

        // pop up alert that game is lost
        Swal.fire({
          icon: 'error',
          title: 'BOOM! EXPLOSION',
          text: `Please Try Again!!`,
          showDenyButton: true,
          denyButtonText: 'Restart Game',
          timer: 5000,
        }).then((result) => {
          if (result.isDenied) resetGame();
        });
        setTimeout(resetGame, 3000); //restart game
      } else {
        // no bomb found , PLEW!
        // revealing cell
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
          setGameWon(true);
          setGameScore(gameBoard.totalCellCount());

          // Player has won, success message
          Swal.fire({
            icon: 'success',
            title: 'CONGRADULATIONS',
            text: `YOU WON!! SCORE: ${gameScore}`,
            showDenyButton: true,
            denyButtonText: 'Play Again',
            timer: 5000,
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

  // reset the board
  function resetGame() {
    //generate new gameboard
    gameBoard = new Board(Nx, Ny, difficulty);
    // reset game state with all cells hidden
    setGameState(gameBoard.getInitialState());
  }

  return (
    <>
      <ScoreBoard>
        <span>SCORE: {gameScore}</span>
        <span>MINES: {gameBoard.totalMineCount()}</span>
        <button type='submit' onClick={() => resetGame()}>
          Restart Game
        </button>
      </ScoreBoard>
      <GameGrid>
        {gameState.map((rows, x) => {
          return (
            <>
              {rows.map((cell, y) => {
                return (
                  <GameCell
                    key={`${uuid.v4()}`}
                    x={x}
                    y={y}
                    hasMine={gameBoard.hasMine(x, y)}
                    isRevealed={gameState[x][y]}
                    adjacentBombs={gameBoard.adjacentMines(x, y)}
                    revealCell={revealCell}
                  />
                );
              })}
            </>
          );
        })}
      </GameGrid>
    </>
  );
};

export default App;
