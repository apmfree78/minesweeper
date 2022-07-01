import React, { useState, ChangeEvent } from 'react';
import KeyPad from './KeyPad';
import Controls from './Controls';
import Board from './gameBoard';
import styled, { StyledComponent } from 'styled-components';
import { drumSounds, soundLookup } from '../drum-data';

//size of board , Nx x Ny
const Nx: number = 5;
const Ny: number = 5;
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

const gameGrid: StyledComponent<'div', any, {}, never> = styled.div`
  display: grid;
  grid-template-rows: repeat(${Nx}, 1fr);
  grid-template-columns: repeat(${Ny}, 1fr);
`;

interface Sound {
  name: string;
  file: string;
  track: number;
  key: string;
}

interface Sounds {
  [x: string]: Sound;
}

interface TrackIndex {
  [index: string]: string;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<Game>(gameBoard.getInitialState());
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [sounds, setSounds] = useState<Sounds>(drumSounds);
  const [currentSound, setCurrentSound] = useState<Sound>({
    name: '',
    file: '',
    track: 0,
    key: '',
  });
  const [trackIndex, setTrackIndex] = useState<TrackIndex[]>(soundLookup);
  const [power, setPower] = useState<number | boolean>(true);
  const [track, setTrack] = useState<number | boolean>(0);
  const [volume, setVolume] = useState<number>(20);

  function revealCell(x: number, y: number): void {
    // checking to make sure cell is not revealed
    if (!gameState[x][y]) {
      // checking if there is a mine
      if (gameBoard.hasMine(x, y)) {
        setGameOver(true);
      } else {
        // no bomb found , PLEW!
        // revealing cell
        const newGameState = JSON.parse(JSON.stringify(gameState));
        newGameState[x][y] = true; //this cell is now revealed! :)
        //set neighboring cells that have no bombs to true
        // this function will change new game state with updated
        // state with all revealed cells (ie cells set to true)
        if (gameBoard.adjacentMines(x, y) === 0)
          gameBoard.revealNeighbors(x, y, newGameState);
        setGameState(newGameState);
      }
    }
  }

  //function that takes button the button input 'index'
  //and then plays corresponding sound
  const playDrumSound = (index: string): void => {
    if (!power) return;

    //extract current drum sounds
    // const location: string = trackIndex[Number(track)][index];
    const _currentSound: Sound = sounds[trackIndex[Number(track)][index]];
    //playing drum beta
    const drumbeat: HTMLAudioElement = new Audio();
    //assigning drumsound file
    drumbeat.src = _currentSound.file;
    //setting volume
    drumbeat.volume = volume / 100;
    drumbeat.play();

    //setting state
    setCurrentSound(_currentSound);
  };

  //switch power on and off
  const switchPower = (): void => {
    let _power: number | boolean = power;

    //if power on turn off, else turn on
    _power ? (_power = 0) : (_power = 1);
    //setting state
    setPower(_power);
  };

  //switch between the 2 tracks
  const switchTrack = (): void => {
    let _track: number | boolean = track;

    //if track is set to 0 set to 1 and vis versa
    _track === 0 ? (_track = 1) : (_track = 0);
    //setting state
    setTrack(_track);
  };

  //reading slider and setting volume level
  const setVolumeLevel = (event: ChangeEvent<HTMLInputElement>): void => {
    let _volume: number = parseInt(event.currentTarget.value);
    //set state
    setVolume(_volume);
  };

  // creating JSX for gameboard with bootstrap grip and a double loop
  // const gameGrid: JSX.Element[][] = [[]];

  return (
    <div
      id='drum-machine'
      className='container d-flex align-items-center justify-content-center'>
      <div id='display' className='d-flex'>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>W</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>E</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>Q</KeyPad>
        </div>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>A</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>S</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>D</KeyPad>
        </div>
        <div className='flex-row'>
          <KeyPad playDrumSound={playDrumSound}>Z</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>X</KeyPad>
          <KeyPad playDrumSound={playDrumSound}>C</KeyPad>
        </div>
      </div>
      <div id='controls'>
        <Controls
          volume={volume}
          switchPower={switchPower}
          switchTrack={switchTrack}
          setVolume={setVolumeLevel}
          currentSound={currentSound}
        />
      </div>
    </div> //id='drum-machine'
  );
};

export default App;
