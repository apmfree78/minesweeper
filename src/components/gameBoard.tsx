interface Cell {
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}

type Cells = Cell[][];
type Game = boolean[][];

export default class Board {
  numberOfMines: number; // number of mines on board

  // x and y dimensions
  xDim: number;
  yDim: number;

  // gameBoard is double array containing all Cells of game
  // where each Cell contains the 3 fields defined in interface Cell
  gameBoard: Cells = [[]];

  // initial state where false => cell hidden, true => cell is revealed
  intialGameState: boolean[][] = [[]];

  constructor(Nx: number, Ny: number, difficulty: string = 'easy') {
    let frequency: number = 0.1; // easy frequency setting

    // setting board dimensions
    this.xDim = Nx;
    this.yDim = Ny;

    //checking if there is higher difficulting setting
    if (difficulty === 'medium') frequency = 0.15;
    else if (difficulty === 'hard') frequency = 0.2;

    // calculating number of bombs on minefield
    this.numberOfMines = Nx * Ny * frequency;

    // initializing adjacent mine arrays to zero before placing mines
    for (let i = 0; i < Nx; i++) {
      for (let j = 0; j < Ny; j++) {
        this.gameBoard[i][j].adjacentMines = 0;
      }
    }
    // initialing gameBoard with Mines locations
    // true => cell contains Mines, false = cell is clear
    // all setting gameInitalState =>
    // true => cell is revealed, false => cell is hidden
    for (let i = 0; i < Nx; i++) {
      for (let j = 0; j < Ny; j++) {
        // determine surround coordinates of cell i,j
        const surroundingCells: number[][] = this.surroundingCellCoordinates(
          i,
          j
        );

        // placing mines on gameBoard
        if (Math.random() < frequency) {
          this.gameBoard[i][j].hasMine = true;
          // updating surrounding mine count
          for (const [x, y] of surroundingCells) {
            if (x > 0 && y > 0 && x < Nx - 1 && y < Ny - 1)
              this.gameBoard[x][y].adjacentMines++;
          }
        } else this.gameBoard[i][j].hasMine = false;
        // setting gameInitialState to all false
        this.intialGameState[i][j] = false;
      }
    }
  }

  // return surround cell coordinates of cell x, y
  surroundingCellCoordinates = (x: number, y: number): number[][] => {
    return [
      [x + 1, y + 1],
      [x, y + 1],
      [x + 1, y],
      [x - 1, y - 1],
      [x, y - 1],
      [x - 1, y],
      [x + 1, y - 1],
      [x - 1, y + 1],
    ];
  };

  // define methods
  // return of location x, y has a bomb
  hasMine(x: number, y: number): boolean {
    return this.gameBoard[x][y].hasMine;
  }

  // return intial state of board , NxN boolean matrix
  // where all elements are false (ie hidden)
  getInitialState(): boolean[][] {
    return this.intialGameState;
  }

  // number of adjacent cells that contain mines
  adjacentMines(x: number, y: number): number {
    return this.gameBoard[x][y].adjacentMines;
  }

  // total number of mines on the board
  totalMineCount() {
    return this.numberOfMines;
  }

  // recursive function to reveal each neighor that does not contain
  // a bomb. Neighbors are ALL surround cells
  revealNeighbors(i: number, j: number, state: Game): void {
    // determine surround coordinates of cell i,j
    const surroundingCells: number[][] = this.surroundingCellCoordinates(i, j);

    for (const [x, y] of surroundingCells) {
      if (
        x > 0 &&
        y > 0 &&
        x < this.xDim - 1 &&
        y < this.yDim - 1 &&
        !this.hasMine(x, y) &&
        !state[x][y]
      ) {
        state[x][y] = true;
        if (this.adjacentMines(x, y) === 0) this.revealNeighbors(x, y, state);
      }
    }
  }
}
