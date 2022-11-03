/*const puzzleInformation = {
  name: "NinjaSe 4x5",
  board: {
    rows: "5",
    columns: "4",
  },
  doors: [
    {
      label: "A",
      isLocked: "true",
      keyColor: "green",
    },
    {
      label: "B",
      isLocked: "true",
      keyColor: "red",
    },
  ],
  walls: [
    {
      label: "C",
    },
    {
      label: "D",
    },
    {
      label: "E",
    },
    {
      label: "F",
    },
    {
      label: "G",
    },
    {
      label: "H",
    },
    {
      label: "I",
    },
    {
      label: "J",
    },
  ],
  locations: [
    {
      door: "A",
      location: {
        row: "3",
        column: "4",
      },
    },
    {
      door: "B",
      location: {
        row: "5",
        column: "2",
      },
    },
    {
      wall: "C",
      location: {
        row: "1",
        column: "4",
      },
    },
    {
      wall: "D",
      location: {
        row: "2",
        column: "2",
      },
    },
    {
      wall: "E",
      location: {
        row: "2",
        column: "3",
      },
    },
    {
      wall: "F",
      location: {
        row: "2",
        column: "4",
      },
    },
    {
      wall: "G",
      location: {
        row: "4",
        column: "1",
      },
    },
    {
      wall: "H",
      location: {
        row: "4",
        column: "2",
      },
    },
    {
      wall: "I",
      location: {
        row: "4",
        column: "4",
      },
    },
    {
      wall: "J",
      location: {
        row: "5",
        column: "4",
      },
    },
  ],
};

export { puzzleInformation };*/
export const level1 = {
  rows: 5,
  columns: 4,
  ninjase: { row: 2, column: 0 },
  walls: [
    { row: 0, column: 3 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 3, column: 0 },
    { row: 3, column: 1 },
    { row: 3, column: 3 },
    { row: 4, column: 3 },
  ],
  doors: [
    { color: "green", row: 2, column: 3 },
    { color: "red", row: 4, column: 1 },
  ],
  keys: [
    { color: "green", row: 4, column: 0 },
    { color: "red", row: 0, column: 2 },
  ],
};
