import { ChangeEvent, FormEvent, useState } from 'react';
// import { GameForm } from '../library/gameStyled';
import styled from 'styled-components';
import { gameSizeOptions, gameLevels } from '../library/gameSpecs';

interface Props {
  // handleSubmit: (e: FormEvent) => void;
  width: number;
  resetGame: (xDim: number, yDim: number, level: string) => void;
}

interface Inputs {
  xDim: number;
  yDim: number;
  difficulty: string;
}

interface GameForm {
  width: number;
}

// Input Form for player to choose size and difficulty and start new game
const GameForm = styled.form<GameForm>`
  /* background-color: #ccc; */
  width: ${(p) => p.width}vmin;
  height: auto;
  padding: 1vmin 0vmin 1vmin 0vmin;
  margin-bottom: 1vmin;
  border: 5px solid aqua;
  color: orange;
  font-family: 'emulogicregular';
  font-size: 1vmin;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

// This is simple inline form at bottom of game that allows player
// to customize height , width, and difficulty of game
// it has 1 prop: resetGame, which allows this component
// to launch a new game with user specified customization
// using resetGame functional prop
export const GameInputForm: React.FC<Props> = ({ resetGame, width }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    xDim: 15,
    yDim: 20,
    difficulty: 'easy',
  });

  // update state 'inputValues' when player selects dropdown option
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    let { value, name } = event.currentTarget;
    let numValue: number;
    // console.log(name);

    if (name === 'xDim' || name === 'yDim') {
      numValue = parseInt(value);

      setInputValues({
        ...inputValues,
        [name]: numValue,
      });
    } else {
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  // take user input and launch new game
  const handleSubmit = (event: FormEvent): void => {
    // prevent default behavior
    event.preventDefault();

    //extracting values from state
    let { xDim, yDim, difficulty } = inputValues;

    //create new game with user inputed values
    resetGame(xDim, yDim, difficulty);
  };

  return (
    <GameForm width={width} onSubmit={handleSubmit}>
      <label id='xDim'>
        Height
        <select
          style={{
            marginLeft: 12,
            padding: 5,
            borderWidth: 5,
            borderColor: '#CCC',
          }}
          id='xDim'
          name='xDim'
          value={inputValues.xDim}
          onChange={handleChange}>
          {gameSizeOptions.map((size) => {
            return (
              <option key={size} value={size}>
                {size}
              </option>
            );
          })}
        </select>
      </label>
      <label id='yDim'>
        Width
        <select
          style={{
            marginLeft: 12,
            padding: 5,
            borderWidth: 5,
            borderColor: '#CCC',
          }}
          id='yDim'
          name='yDim'
          value={inputValues.yDim}
          onChange={handleChange}>
          {gameSizeOptions.map((size) => {
            return (
              <option key={size} value={size}>
                {size}
              </option>
            );
          })}
        </select>
      </label>
      <label id='difficulty'>
        Difficulty
        <select
          style={{
            marginLeft: 12,
            padding: 5,
            borderWidth: 5,
            borderColor: '#CCC',
          }}
          id='difficulty'
          name='difficulty'
          value={inputValues.difficulty}
          onChange={handleChange}>
          {gameLevels.map((level) => {
            return (
              <option key={level} value={level}>
                {level}
              </option>
            );
          })}
        </select>
      </label>
      <button
        type='submit'
        style={{ padding: 4, borderWidth: 5, borderColor: '#CCC' }}>
        Start New Game
      </button>
    </GameForm>
  );
};
