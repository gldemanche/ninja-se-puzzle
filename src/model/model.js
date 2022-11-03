/**
 * move type class
 * keeps track of desired move direction as deltas
 */
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
  constructor(numRows, numColumns) {
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.isSolved = false;
  }
}

export class NinjaSe {
  constructor(info) {
    this.initialize(info);
  }

  initialize(info) {
    let row = parseInt(info.row);
    let column = parseInt(info.column);

    this.row = row;
    this.column = column;
  }
}

export default class Model {
  constructor(info) {
    this.initialize(info);
  }

  initialize(info) {
    let numRows = parseInt(info.row);
    let numColumns = parseInt(info.column);

    this.puzzle = new Room(numRows, numColumns);
    this.numMoves = 0;
    this.victory = false;
  }
}
