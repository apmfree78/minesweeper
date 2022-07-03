import styled, { StyledComponent } from 'styled-components';

// contains styled components for game

// score board shows the score, # of mines, and button to restart game
const ScoreBoard: StyledComponent<'div', any, {}, never> = styled.div`
  /* background-color: #ccc; */
  padding: 7px 0px 5px 0px;
  margin-bottom: 10px;
  border: 5px solid aqua;
  color: orange;
  font-family: 'emulogicregular';
  font-size: 18px;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

// Input Form for player to choose size and difficulty and start new game
const GameForm: StyledComponent<'form', any, {}, never> = styled.form`
  /* background-color: #ccc; */
  padding: 10px 0px 10px 0px;
  margin-bottom: 10px;
  border: 5px solid aqua;
  color: orange;
  font-family: 'emulogicregular';
  font-size: 14px;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

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

const RevealBox = styled(CellBox)`
  background-color: #ccc;
  border: 0.15vmin solid black;
`;

export { ScoreBoard, GameForm, CellBox, RevealBox };
