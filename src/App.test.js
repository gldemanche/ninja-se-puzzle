import React from "react";
import { render, screen } from "@testing-library/react";
import { Model } from "./model/Model.js";

import { level1 } from "./model/Levels.js";
import App from "./App.js";

var actualPuzzle = JSON.parse(JSON.stringify(level1));
var model = new Model(actualPuzzle);

test("No moves when model created", () => {
  expect(model.numMoves).toBe(0);
});

test("Ninja Se starts lvl 1 row right", () => {
  expect(model.ninjase.row).toBe(2);
});

test("Ninja Se starts lvl 1 column right", () => {
  expect(model.ninjase.column).toBe(0);
});

test("properly renders 0 moves", () => {
  const { getByText } = render(<App />);
  const movesElement = getByText(/number moves:/i);
  expect(movesElement).toBeInTheDocument();
});
