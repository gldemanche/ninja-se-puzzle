// redraw the Puzzle so I can see it

// Scaling Constants for Canvas
var BOXSIZE = 100;
const OFFSET = 8;

/** Represents a rectangle. */
export class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y + 150;
    this.size = size;
  }
}

export function computeSquare(cell) {
  return new Square(
    BOXSIZE * cell.column + OFFSET,
    BOXSIZE * cell.row + OFFSET,
    BOXSIZE - 2 * OFFSET,
    BOXSIZE - 2 * OFFSET
  );
}
export function drawWalls(ctx, puzzle, showlabels) {
  ctx.shadowColor = "black";

  puzzle.walls.forEach((wall) => {
    let sq = computeSquare(wall);
    ctx.fillStyle = "black";
    ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
  });
}
export function drawDoors(ctx, puzzle, showlabels) {
  ctx.shadowColor = "black";

  puzzle.doors.forEach((door) => {
    let sq = computeSquare(door);
    let color = door.getColor();
    if (color === "red") {
      ctx.fillStyle = "#ff0000";
    } else if (color === "blue") {
      ctx.fillStyle = "#0000ff";
    } else if (color === "green") {
      ctx.fillStyle = "#00ff00";
    } else {
      ctx.fillStyle = "#ffff00";
    }
    ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
  });
}

/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
  const ctx = canvasObj.getContext("2d");
  if (ctx === null) {
    return;
  }
  ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

  // showing the outermost information
  let nr = model.puzzle.nr;
  let nc = model.puzzle.nc;

  ctx.fillStyle = "black";

  for (let r = 0; r < nr; r++) {
    for (let c = 0; c < nc; c++) {
      // let key = r + "," + c;
      let cell = model.puzzle.cells[r][c];
      let sq = computeSquare(cell);
      // HERE is where you draw everything about this cell that you know about...
      ctx.beginPath();
      ctx.rect(sq.x, sq.y, sq.size, sq.size);
      ctx.stroke();
    }
  }
  if (model.puzzle) {
    drawWalls(ctx, model.puzzle, model.showlabels);
    drawDoors(ctx, model.puzzle, model.showlabels);
  }
}
