import { level1, level2, level3 } from "./Levels";
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
  constructor(r, c) {
    this.row = r;
    this.column = c;
  }
}

export class Key {
  constructor(row, column, color) {
    this.row = row;
    this.column = column;
    this.color = color;
  }
}

export class Wall {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

export class Door {
  constructor(row, column, color) {
    this.row = row;
    this.column = column;
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}
export class NinjaSe {
  constructor(row, column) {
    this.initialize(row, column);
  }

  initialize(row, column) {
    this.row = row;
    this.column = column;
    this.key = null;
  }

  pickKey(key) {
    this.key = key;
  }

  move(direction) {
    this.row += direction.deltar;
    this.column += direction.deltac;
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

  initialize(walls, doors, keys) {
    this.walls = walls;
    this.doors = doors;
    this.keys = keys;
  }

  removeKey(key) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
    }
  }

  replaceKey(key, newKey) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1, newKey);
    }
  }

  removeDoor(door) {
    const index = this.doors.indexOf(door);
    if (index > -1) {
      this.doors.splice(index, 1);
    }
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
    this.level = level;
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
    var allDoors = [];
    for (let d of level.doors) {
      allDoors.push(new Door(parseInt(d.row), parseInt(d.column), d.color));
    }

    var allKeys = [];
    for (let k of level.keys) {
      allKeys.push(new Key(parseInt(k.row), parseInt(k.column), k.color));
    }

    this.puzzle = new Puzzle(nr, nc, level);
    this.puzzle.initialize(allWalls, allDoors, allKeys);
    this.ninjase = new NinjaSe(row, column);
    this.numMoves = 0;
    this.victory = false;
    this.showLabels = false;
  }

  updateMoveCounter(delta) {
    this.numMoves += delta;
  }

  numbermoves() {
    return this.numMoves;
  }

  availableMoves() {
    let moves = [];
    let curRow = this.ninjase.row;
    let curColumn = this.ninjase.column;

    let availableToMove = false;
    if (curColumn > 0) {
      availableToMove = true;
      this.puzzle.walls.forEach((wall) => {
        let r = wall.row;
        let c = wall.column;
        if (r === curRow && c === curColumn - 1) {
          availableToMove = false;
        }
      });
    }
    if (availableToMove) {
      moves.push(Left);
    }

    availableToMove = false;
    if (curColumn < this.puzzle.nc - 1) {
      availableToMove = true;
      this.puzzle.walls.forEach((wall) => {
        let r = wall.row;
        let c = wall.column;
        if (r === curRow && c === curColumn + 1) {
          availableToMove = false;
        }
      });
    }
    if (availableToMove) {
      moves.push(Right);
    }

    availableToMove = false;
    if (curRow > 0) {
      availableToMove = true;
      this.puzzle.walls.forEach((wall) => {
        let r = wall.row;
        let c = wall.column;
        if (r === curRow - 1 && c === curColumn) {
          availableToMove = false;
        }
      });
    }
    if (availableToMove) {
      moves.push(Up);
    }

    availableToMove = false;
    if (curRow < this.puzzle.nr - 1) {
      availableToMove = true;
      this.puzzle.walls.forEach((wall) => {
        let r = wall.row;
        let c = wall.column;
        if (r === curRow + 1 && c === curColumn) {
          availableToMove = false;
        }
      });
    }
    if (availableToMove) {
      moves.push(Down);
    }
    return moves;
  }

  removeMoves(moves) {
    let curRow = this.ninjase.row;
    let curColumn = this.ninjase.column;

    let availableToMove = false;
    if (curRow < this.puzzle.nr - 1) {
      availableToMove = true;
      this.puzzle.doors.forEach((door) => {
        let r = door.row;
        let c = door.column;
        let dc = door.getColor();
        if (r === curRow + 1 && c === curColumn) {
          if (this.ninjase.key === null) {
            availableToMove = false;
          } else if (this.ninjase.key.color !== dc) {
            availableToMove = false;
          }
        }
      });
    }
    if (!availableToMove) {
      const index = moves.indexOf(Down);
      if (index > -1) {
        moves.splice(index, 1);
      }
    }
    //up
    availableToMove = false;
    if (curRow > 0) {
      availableToMove = true;
      this.puzzle.doors.forEach((door) => {
        let r = door.row;
        let c = door.column;
        let dc = door.getColor();
        if (r === curRow - 1 && c === curColumn) {
          if (this.ninjase.key === null) {
            availableToMove = false;
          } else if (this.ninjase.key.color !== dc) {
            availableToMove = false;
          }
        }
      });
    }
    if (!availableToMove) {
      const index = moves.indexOf(Up);
      if (index > -1) {
        moves.splice(index, 1);
      }
    }
    //right
    availableToMove = false;
    if (curColumn < this.puzzle.nc - 1) {
      availableToMove = true;
      this.puzzle.doors.forEach((door) => {
        let r = door.row;
        let c = door.column;
        let dc = door.getColor();
        if (r === curRow && c === curColumn + 1) {
          if (this.ninjase.key === null) {
            availableToMove = false;
          } else if (this.ninjase.key.color !== dc) {
            availableToMove = false;
          }
        }
      });
    }
    if (!availableToMove) {
      const index = moves.indexOf(Right);
      if (index > -1) {
        moves.splice(index, 1);
      }
    }
    //left
    availableToMove = false;
    if (curColumn > 0) {
      availableToMove = true;
      this.puzzle.doors.forEach((door) => {
        let r = door.row;
        let c = door.column;
        let dc = door.getColor();
        if (r === curRow && c === curColumn - 1) {
          if (this.ninjase.key === null) {
            availableToMove = false;
          } else if (this.ninjase.key.color !== dc) {
            availableToMove = false;
          }
        }
      });
    }
    if (!availableToMove) {
      const index = moves.indexOf(Left);
      if (index > -1) {
        moves.splice(index, 1);
      }
    }
    return moves;
  }

  available(direction) {
    if (direction === NoMove) {
      return false;
    }
    let allMoves = this.availableMoves();
    let doorMoves = this.removeMoves(allMoves);
    return doorMoves.includes(direction);
  }

  ninjaPickKey() {
    let index = null;
    this.puzzle.keys.forEach((key) => {
      let r = key.row;
      let c = key.column;

      if (c === this.ninjase.column && r === this.ninjase.row) {
        if (this.ninjase.key !== null) {
          let tempColor = this.ninjase.key.color;
          let tempKey = new Key(r, c, tempColor);
          this.ninjase.pickKey(key);
          this.puzzle.replaceKey(key, tempKey);
          //console.log(key, this.ninjase.key, tempKey);
        } else {
          this.ninjase.pickKey(key);
          this.puzzle.removeKey(key);
        }
      }
    });
  }

  availableKey() {
    let availableKey = false;
    this.puzzle.keys.forEach((key) => {
      let r = key.row;
      let c = key.column;

      if (c === this.ninjase.column && r === this.ninjase.row) {
        availableKey = true;
      }
    });
    return availableKey;
  }

  checkDoors() {
    let curRow = this.ninjase.row;
    let curColumn = this.ninjase.column;
    this.puzzle.doors.forEach((door) => {
      let r = door.row;
      let c = door.column;
      if (r === curRow && c === curColumn) {
        this.puzzle.removeDoor(door);
        this.ninjase.key = null;
      }
    });
  }

  allDoorsGone() {
    return this.puzzle.doors.length === 0;
  }

  winMessage() {
    let levelString = "Level";
    if (this.allDoorsGone()) {
      if (this.level === level1) {
        levelString = "1";
      } else if (this.level === level2) {
        levelString = "2";
      } else if (this.level === level3) {
        levelString = "3";
      }
      return "You beat level " + levelString + "!";
    }
  }
}
