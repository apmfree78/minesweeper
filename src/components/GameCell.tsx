import React from 'react';
import styled, { StyledComponent } from 'styled-components';

interface Props {
  x: number;
  y: number;
  hasMine: boolean;
  isRevealed: boolean;
  adjacentBombs: number;
  revealCell: (x: number, y: number) => void;
}

const CellBox: StyledComponent<'div', any, {}, never> = styled.div`
  height: 100px;
  width: 100px;
  background-color: #62488f;
  border: 5px black;
  color: #fff;
`;

//GameCell button - reusable component
const GameCell: React.FC<Props> = ({
  x,
  y,
  hasMine,
  isRevealed,
  adjacentBombs,
  revealCell,
}) => {
  // setting unique id
  let displayValue: string = ' ';

  if (isRevealed) {
    if (hasMine) displayValue = '*';
    else displayValue = adjacentBombs.toString();
  }

  return <CellBox onClick={() => revealCell(x, y)}>{displayValue}</CellBox>;
};

export default GameCell;
