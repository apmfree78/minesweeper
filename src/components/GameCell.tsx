import React from 'react';

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
  // setting unique id
  const id: string = JSON.stringify([x, y]);
  let displayValue: string = ' ';

  if (isRevealed) {
    if (hasMine) displayValue = '*';
    else displayValue = adjacentBombs.toString();
  }

  return (
    <div id='drum-pad'>
      <button
        className='btn btn-primary btn-lg'
        type='submit'
        id={id}
        onClick={() => revealCell(x, y)}>
        {displayValue}
      </button>
    </div>
  );
};

export default GameCell;
