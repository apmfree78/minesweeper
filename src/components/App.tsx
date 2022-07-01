import React, { useState, ChangeEvent } from 'react';
import KeyPad from './KeyPad';
import Controls from './Controls';
import Board from './gameBoard';
import styled, { StyledComponent } from 'styled-components';
import { drumSounds, soundLookup } from '../drum-data';
import GameCell from './GameCell';
import uuid from 'react-native-uuid';

//size of board , Nx x Ny
const Nx: number = 20;
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
const gameBoard: Board = new Board(Nx, Ny, difficulty);
type Game = boolean[][];

const GameGrid: StyledComponent<'div', any, {}, never> = styled.div`
  background-color: #ccc;
  width: 100vmin;
  height: 100vmin;
  display: grid;
  grid-template-rows: repeat(${Nx}, 1fr);
  grid-template-columns: repeat(${Ny}, 1fr);
`;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<Game>(gameBoard.getInitialState());
  const [gameOver, setGameOver] = useState<boolean>(false);

  function revealCell(x: number, y: number): void {
    // checking to make sure cell is not revealed
    if (!gameState[x][y]) {
      // saving cell state
      const newGameState = JSON.parse(JSON.stringify(gameState));
      newGameState[x][y] = true; //this cell is now revealed! :)

      // checking if there is a mine
      if (gameBoard.hasMine(x, y)) {
        setGameOver(true);
        setGameState(newGameState);
      } else {
        // no bomb found , PLEW!
        // revealing cell
        //set neighboring cells that have no bombs to true
        // this function will change new game state with updated
        // state with all revealed cells (ie cells set to true)
        if (gameBoard.adjacentMines(x, y) === 0)
          gameBoard.revealNeighbors(x, y, newGameState);
        setGameState(newGameState);
      }
    }
  }

  return (
    <>
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

      {/*       <div id='controls'>
        <Controls
          volume={volume}
          switchPower={switchPower}
          switchTrack={switchTrack}
          setVolume={setVolumeLevel}
          currentSound={currentSound}
        />
      </div> */}
    </>
  );
};

export default App;
