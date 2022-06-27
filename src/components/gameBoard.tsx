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
        // placing mines on gameBoard
        if (Math.random() < frequency) {
          this.gameBoard[i][j].hasMine = true;
          // updating surrounding mine count
          if (i < Nx - 1) this.gameBoard[i + 1][j].adjacentMines++;
          if (i > 0) this.gameBoard[i - 1][j].adjacentMines++;
          if (j < Ny - 1) this.gameBoard[i][j + 1].adjacentMines++;
          if (j > 0) this.gameBoard[i][j - 1].adjacentMines++;
          if (i < Nx - 1 && j < Ny - 1)
            this.gameBoard[i + 1][j + 1].adjacentMines++;
          if (i < Nx - 1 && j > 0) this.gameBoard[i + 1][j - 1].adjacentMines++;
          if (i > 0 && j < Ny - 1) this.gameBoard[i - 1][j + 1].adjacentMines++;
          if (i > 0 && j > 0) this.gameBoard[i - 1][j - 1].adjacentMines++;
        } else this.gameBoard[i][j].hasMine = false;
        // setting gameInitialState to all false
        this.intialGameState[i][j] = false;
      }
    }
  }

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
    if (i < this.xDim - 1 && !this.hasMine(i + 1, j) && !state[i + 1][j]) {
      state[i + 1][j] = true;
      if (this.adjacentMines(i + 1, j) === 0)
        this.revealNeighbors(i + 1, j, state);
    }

    if (i > 0 && !this.hasMine(i - 1, j) && !state[i - 1][j]) {
      state[i - 1][j] = true;
      if (this.adjacentMines(i - 1, j) === 0)
        this.revealNeighbors(i - 1, j, state);
    }

    if (j < this.yDim - 1 && this.hasMine(i, j + 1) && !state[i][j + 1]) {
      state[i][j + 1] = true;
      if (this.adjacentMines(i, j + 1) === 0)
        this.revealNeighbors(i, j + 1, state);
    }
    if (j > 0 && !this.hasMine(i, j - 1) && !state[i][j - 1]) {
      state[i][j - 1] = true;
      if (this.adjacentMines(i, j - 1) === 0)
        this.revealNeighbors(i, j - 1, state);
    }
    if (
      i < this.xDim - 1 &&
      j > 0 &&
      !this.hasMine(i + 1, j - 1) &&
      !state[i + 1][j - 1]
    ) {
      state[i + 1][j - 1] = true;
      if (this.adjacentMines(i + 1, j - 1) === 0)
        this.revealNeighbors(i + 1, j - 1, state);
    }
    if (i > 0 && j > 0 && !this.hasMine(i - 1, j - 1) && !state[i - 1][j - 1]) {
      state[i - 1][j - 1] = true;
      if (this.adjacentMines(i - 1, j - 1) === 0)
        this.revealNeighbors(i - 1, j - 1, state);
    }
    if (
      i > 0 &&
      j < this.yDim - 1 &&
      !this.hasMine(i - 1, j + 1) &&
      !state[i - 1][j + 1]
    ) {
      state[i - 1][j + 1] = true;
      if (this.adjacentMines(i - 1, j + 1) === 0)
        this.revealNeighbors(i - 1, j + 1, state);
    }
    if (
      i < this.xDim - 1 &&
      j < this.yDim - 1 &&
      !this.hasMine(i + 1, j + 1) &&
      !state[i + 1][j + 1]
    ) {
      state[i + 1][j + 1] = true;
      if (this.adjacentMines(i + 1, j + 1) === 0)
        this.revealNeighbors(i + 1, j + 1, state);
    }
  }
}
