import { ChangeEvent, FormEvent, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';

// Input Form for player to choose size and difficulty and start new game
const GameForm: StyledComponent<'form', any, {}, never> = styled.form`
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

interface Props {
  handleSubmit: (e: FormEvent) => void;
}

interface Inputs {
  xDim: number;
  yDim: number;
  difficulty: string;
}

export const GameInputForm: React.FC<Props> = ({ handleSubmit }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    xDim: 15,
    yDim: 20,
    difficulty: 'easy',
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    let { value, name, type } = event.currentTarget;
    let numValue: number;

    if (type === 'number') {
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

  return (
    <GameForm onSubmit={handleSubmit}>
      <select
        id='xdim'
        name='xdim'
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
      <select
        id='ydim'
        name='ydim'
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
      <select
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
    </GameForm>
  );
};
