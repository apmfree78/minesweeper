interface Cell {
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}

type Cells = Cell[][];
type Game = boolean[][];

export default class Board {
  numberOfMines: number = 0; // number of mines on board
  revealedCells: number = 0; // keeps track of number of revealed cells
  totalCells: number = 0; //total number of cells in the game;

  // x and y dimensions + GameGrid dimensions
  xDim: number;
  yDim: number;
  xHeight: number;
  yWidth: number;

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

    // calculate total cells in game
    this.totalCells = Nx * Ny;

    // setting GameGrid vmin dimensions
    if (Nx > Ny) {
      this.xHeight = 100;
      this.yWidth = Math.round((0.8 * (100 * Ny)) / Nx);
    } else {
      this.xHeight = Math.round((0.8 * 100 * Nx) / Ny);
      this.yWidth = 100;
    }

    //checking if there is higher difficulting setting
    if (difficulty === 'medium') frequency = 0.15;
    else if (difficulty === 'hard') frequency = 0.2;

    // initializing adjacent mine arrays to zero before placing mines
    for (let i = 0; i < Nx; i++) {
      this.gameBoard[i] = [];
      for (let j = 0; j < Ny; j++) {
        this.gameBoard[i][j] = this.createBlankCell();
      }
    }
    // initialing gameBoard with Mines locations
    // true => cell contains Mines, false = cell is clear
    // all setting gameInitalState =>
    // true => cell is revealed, false => cell is hidden
    for (let i = 0; i < Nx; i++) {
      this.intialGameState[i] = [];
      for (let j = 0; j < Ny; j++) {
        // determine surround coordinates of cell i,j
        const surroundingCells: number[][] = this.surroundingCellCoordinates(
          i,
          j
        );

        // placing mines on gameBoard
        if (Math.random() < frequency) {
          this.gameBoard[i][j].hasMine = true;

          // increase mine counter
          this.numberOfMines++;
          console.log('mine in place');
          // updating surrounding mine count
          for (const [x, y] of surroundingCells) {
            if (x >= 0 && y >= 0 && x < Nx && y < Ny)
              this.gameBoard[x][y].adjacentMines++;
          }
        } else this.gameBoard[i][j].hasMine = false;
        // setting gameInitialState to all false
        this.intialGameState[i][j] = false;
      }
    }
  }

  // returns blank cell
  createBlankCell(): Cell {
    return {
      hasMine: false, // true => has a mine, false => no mine
      adjacentMines: 0, // number of neighors that have a mine
    };
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

  // total number of cells on the board
  totalCellCount() {
    return this.totalCells;
  }

  // recursive function to reveal each neighor that does not contain
  // a bomb. Neighbors are ALL surround cells
  revealNeighbors(i: number, j: number, state: Game): void {
    // determine surround coordinates of cell i,j
    const surroundingCells: number[][] = this.surroundingCellCoordinates(i, j);

    for (const [x, y] of surroundingCells) {
      if (
        x >= 0 &&
        y >= 0 &&
        x < this.xDim &&
        y < this.yDim &&
        !this.hasMine(x, y) &&
        !state[x][y]
      ) {
        state[x][y] = true;
        this.revealedCells++; //add to count of revealed cells
        if (this.adjacentMines(x, y) === 0) this.revealNeighbors(x, y, state);
      }
    }
  }
}
