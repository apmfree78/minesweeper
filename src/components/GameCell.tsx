import React, { ColgroupHTMLAttributes, useEffect } from 'react';
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
  /*   height: 100px;
    width: 100px; */
  background-color: #62488f;
  margin: 1px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
`;

const RevealBox = styled(CellBox)`
  background-color: #ccc;
  border: 0.15vmin solid black;
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
  // display values
  let displayValue: string = ' ';
  // console.log(hasMine);

  if (isRevealed) {
    if (hasMine) {
      // console.log('mine found!');
      displayValue = 'B';
    } else {
      displayValue = adjacentBombs.toString();
    }
    return <RevealBox>{displayValue}</RevealBox>;
  } else return <CellBox onClick={() => revealCell(x, y)} />;
};

export default GameCell;
