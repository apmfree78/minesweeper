import { MouseEvent } from 'react';
import { CellBox, RevealBox } from '../library/gameStyled';

// interface for full cell state
interface CellProp {
  isFlagged: boolean; //true => cell is flagged, false => not flagged
  isRevealed: boolean; //true => cell is revealed, false => hidden
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}

interface Props {
  x: number;
  y: number;
  cellState: CellProp;
  revealCell: (x: number, y: number) => void;
  flagCell: (x: number, y: number) => void;
}

//GameCell button - reusable component
const GameCell: React.FC<Props> = ({
  x,
  y,
  cellState,
  revealCell,
  flagCell,
}) => {
  // display values
  let displayValue: string = ' ';
  // console.log(hasMine);

  const handleClick = (e: MouseEvent): void => {
    // console.log(e.type);
    if (e.type === 'click') {
      revealCell(x, y);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();
      flagCell(x, y);
    }
  };

  if (cellState.isRevealed) {
    //check if cell has mine
    if (cellState.hasMine) {
      displayValue = 'B';
    } else {
      // no mine, show # of adjacent bombs
      displayValue = cellState.adjacentMines.toString();
    }
    // display revealed cell
    return <RevealBox>{displayValue}</RevealBox>;
  }
  // if player has flagged cell
  else if (cellState.isFlagged) displayValue = 'X';
  return (
    <CellBox onClick={handleClick} onContextMenu={handleClick}>
      {displayValue}
    </CellBox>
  );
};

export default GameCell;
