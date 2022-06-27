interface Cell {
  hasMine: boolean; // true => has a mine, false => no mine
  adjacentMines: number; // number of neighors that have a mine
}

type Cells = Cell[][];

export default class Board {
  numberOfMines: number; // number of mines on board

  // gameBoard is double array containing all Cells of game
  // where each Cell contains the 3 fields defined in interface Cell
  gameBoard: Cells = [[]];

  // initial state where false => cell hidden, true => cell is revealed
  intialGameState: boolean[][] = [[]];

  constructor(Nx: number, Ny: number, difficulty: string = 'easy') {
    let frequency: number = 0.1; // easy frequency setting

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
}
