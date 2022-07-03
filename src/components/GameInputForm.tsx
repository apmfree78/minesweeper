import { FormEvent, useState } from 'react';
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

  const handleChange = (event: FormEvent) => {};

  return (
    <GameForm onSubmit={handleSubmit}>
      <select value={inputValues.xDim} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <select value={inputValues.yDim} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <select value={inputValues.difficulty} onChange={handleChange}>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
    </GameForm>
  );
};
