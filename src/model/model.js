// not using now..
export class Cell {
  constructor(r, c) {
    this.row = r;
    this.column = c;
  }
}

export class Wall {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  copy() {
    let p = new Wall(this.row, this.column);
    return p;
  }
}
export class NinjaSe {
  constructor(row, column) {
    this.initialize(row, column);
  }

  initialize(row, column) {
    this.row = row;
    this.column = column;
  }
}

export class Puzzle {
  constructor(nr, nc, level) {
    this.nr = nr;
    this.nc = nc;
    this.level = level;

    this.cells = [];
    for (let r = 0; r < nr; r++) {
      this.cells[r] = [];
      for (let c = 0; c < 5; c++) {
        this.cells[r][c] = new Cell(r, c);
      }
    }
  }

  initialize(walls) {
    this.walls = walls;
  }

  /*
  *blocks() {
    for (let i = 0; i < this.walls.length; i++) {
      yield this.walls[i];
    }
  } */
}

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
  constructor(level) {
    this.initialize(level);
  }

  initialize(level) {
    this.level = level;

    let nr = level.rows;
    let nc = level.columns;
    let row = level.ninjase.row;
    let column = level.ninjase.column;

    var allWalls = [];
    for (let w of level.walls) {
      allWalls.push(new Wall(parseInt(w.row), parseInt(w.column)));
    }

    this.puzzle = new Puzzle(nr, nc, level);
    this.puzzle.initialize(allWalls);
    this.ninjase = new NinjaSe(row, column);
    this.numMoves = 0;
    this.victory = false;
    this.showLabels = false;
  }
}

/**
 * move type class
 * keeps track of desired move direction as deltas
 */
/*
export class MoveType {
  constructor(dr, dc) {
    this.deltar = dr;
    this.deltac = dc;
  }

  static parse(s) {
    if (s === "down" || s === "Down") {
      return Down;
    }
    if (s === "up" || s === "Up") {
      return Up;
    }
    if (s === "left" || s === "Left") {
      return Left;
    }
    if (s === "right" || s === "Right") {
      return Right;
    }

    return NoMove;
  }
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*"); // no move is possible

export class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

export class Door {
  constructor(key) {
    this.key = key;
    this.isLocked = true;
    this.row = 0;
    this.column = 0;
  }
}

export class Wall {
  constructor() {
    this.row = 0;
    this.column = 0;
  }
}

export class Room {
  constructor(level) {
    this.initialize(level);
  }

  initialize(level) {
    let numRows = level.row;
    let numColumns = level.column;

    this.numRows = numRows;
    this.numColumns = numColumns;
    this.ninjase = new NinjaSe(level);
    this.isSolved = false;

    this.cells = []
        for (let r = 0; r < numRows; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < numColumns; c++) {
                this.cells[r][c] = new Cell(r, c)
            }
        }
  }
}




 * model knows level, knows the room
 
export default class Model {
  constructor(level) {
    this.initialize(level);
  }

  initialize(level) {
    this.level = level;
    this.room = new Room(level);
    this.numMoves = 0;
    this.victory = false;
  }
}

*/
