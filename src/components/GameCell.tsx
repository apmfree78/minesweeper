import { CellBox, RevealBox } from '../library/gameStyled';

interface Props {
  x: number;
  y: number;
  hasMine: boolean;
  isRevealed: boolean;
  adjacentBombs: number;
  revealCell: (x: number, y: number) => void;
}

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
