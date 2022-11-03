import React from "react";
import { render, screen } from "@testing-library/react";
import Model from "./model/Model.js";

import { puzzleInformation } from "./model/Puzzle.js";

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));
var model = new Model(actualPuzzle);

test("No moves when model created", () => {
  expect(model.numMoves).toBe(0);
});
