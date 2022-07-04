import styled, { StyledComponent } from 'styled-components';

// contains styled components for game

// props for GameGrid Styled Component
interface GridProps {
  width: number;
  height: number;
  xdim: number;
  ydim: number;
}

// styled component for the game board, using CSS grid
// with dynamic values
const GameGrid = styled.div<GridProps>`
  background-color: #ccc;
  font-family: 'emulogicregular'; /* rad 8-bit retro font */
  font-size: 0.1vmin;
  width: ${(p) => p.width}vmin;
  height: ${(p) => p.height}vmin;
  display: grid;
  grid-template-rows: repeat(${(p) => p.xdim}, 1fr);
  grid-template-columns: repeat(${(p) => p.ydim}, 1fr);
`;

interface ScoreBoardProps {
  width: number;
}

// score board shows the score, # of mines, and button to restart game
const ScoreBoard = styled.div<ScoreBoardProps>`
  width: ${(p) => p.width}vmin;
  height: auto;
  padding: 1vmin 0vmin 1vmin 0vmin;
  margin-bottom: 1vmin;
  border: 5px solid aqua;
  color: orange;
  font-family: 'emulogicregular';
  font-size: 1.5vmin;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

interface GameFormProps {
  width: number;
}

// Input Form for player to choose size and difficulty and start new game
const GameForm = styled.form<GameFormProps>`
  width: ${(p) => p.width}vmin;
  height: auto;
  padding: 1vmin 0vmin 1vmin 0vmin;
  margin-bottom: 1vmin;
  margin-top: 0.5vmin;
  border: 5px solid aqua;
  color: orange;
  font-family: 'emulogicregular';
  font-size: 1vmin;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

// css for game cell box (hidden)
const CellBox: StyledComponent<'div', any, {}, never> = styled.div`
  /*   height: 100px;
    width: 100px; */
  background-color: #62488f;
  margin: 1px;
  border-radius: 2px;
  border: 0.15vmin solid orange;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vmin;
  font-weight: bolder;
`;

// revealed cell takes properties of standard CellBox with different
// background color and border
const RevealBox = styled(CellBox)`
  background-color: #ccc;
  border: 0.15vmin solid black;
`;

export { GameGrid, ScoreBoard, GameForm, CellBox, RevealBox };
