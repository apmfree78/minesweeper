import { ChangeEvent, FormEvent, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';

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

interface Props {
  // handleSubmit: (e: FormEvent) => void;
  resetGame: (xDim: number, yDim: number, level: string) => void;
}

interface Inputs {
  xDim: number;
  yDim: number;
  difficulty: string;
}

export const GameInputForm: React.FC<Props> = ({ resetGame }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    xDim: 15,
    yDim: 20,
    difficulty: 'easy',
  });

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

  const handleSubmit = (event: FormEvent): void => {
    // prevent default behavior
    event.preventDefault();

    //extracting values from state
    let { xDim, yDim, difficulty } = inputValues;

    //create new game with user inputed values
    resetGame(xDim, yDim, difficulty);
  };

  return (
    <GameForm onSubmit={handleSubmit}>
      <label id='xDim'>
        Height
        <select
          style={{ marginLeft: 12, padding: 5 }}
          id='xDim'
          name='xDim'
          value={inputValues.xDim}
          onChange={handleChange}>
          <option key={5} value={5}>
            5
          </option>
          <option key={10} value={10}>
            10
          </option>
          <option key={15} value={15}>
            15
          </option>
          <option key={20} value={20}>
            20
          </option>
        </select>
      </label>
      <label id='yDim'>
        Width
        <select
          style={{ marginLeft: 12, padding: 5 }}
          id='yDim'
          name='yDim'
          value={inputValues.yDim}
          onChange={handleChange}>
          <option key={5} value={5}>
            5
          </option>
          <option key={10} value={10}>
            10
          </option>
          <option key={15} value={15}>
            15
          </option>
          <option key={20} value={20}>
            20
          </option>
        </select>
      </label>
      <label id='difficulty'>
        Difficulty
        <select
          style={{ marginLeft: 12, padding: 5 }}
          id='difficulty'
          name='difficulty'
          value={inputValues.difficulty}
          onChange={handleChange}>
          <option key='easy' value='easy'>
            Easy
          </option>
          <option key='medium' value='medium'>
            Medium
          </option>
          <option key='hard' value='hard'>
            Hard
          </option>
        </select>
      </label>
      <button type='submit' style={{ padding: 4 }}>
        Start New Game
      </button>
    </GameForm>
  );
};
