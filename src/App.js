import React from "react";
import { level1 } from "./model/Levels.js";
import { level2 } from "./model/Levels.js";
import { level3 } from "./model/Levels.js";
import { redrawCanvas } from "./boundary/Boundary.js";
import { Model } from "./model/Model.js";
import { layout } from "./Layout.js";
import { MoveType } from "./model/Model.js";
import { movePiece } from "./controller/Controller.js";
// you might try this quick and dirty way to position buttons where you want (and other elements)
const upbutton = {
  position: "absolute",
  left: 600,
  top: 230,
  width: 60,
};

const leftbutton = {
  position: "absolute",
  left: 540,
  top: 270,
};

const downbutton = {
  position: "absolute",
  left: 600,
  top: 310,
};

const rightbutton = {
  position: "absolute",
  left: 670,
  top: 270,
};

const resetbutton = {
  position: "absolute",
  left: 420,
  top: 375,
  fontFamily: "brushscriptmt",
  backgroundColor: "#000000",
  color: "white",
};

const pickupbutton = {
  position: "absolute",
  top: 375,
  left: 540,
  width: 180,
};

const level1button = {
  position: "absolute",
  top: 70,
  left: 50,
  width: 120,
};

const level2button = {
  position: "absolute",
  top: 70,
  left: 250,
  width: 120,
};

const level3button = {
  position: "absolute",

  top: 70,
  left: 450,
  width: 120,
};

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0); // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null); // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current);
  }, [model, redraw]); // arguments that determine when to refresh

  const moveNinjaHandler = (direction) => {
    let newModel = movePiece(model, direction);

    setModel(newModel);
  };
  return (
    <main style={layout.Appmain}>
      <canvas
        tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
      />

      <label style={layout.text}>{"number moves: " + model.numMoves}</label>
      <button
        style={upbutton}
        onClick={(e) => moveNinjaHandler(Up)}
        disable={!model.aviable(Up)}
      >
        UP{" "}
      </button>
      <button
        style={leftbutton}
        onClick={(e) => moveNinjaHandler(Left)}
        disable={!model.aviable(Left)}
      >
        LEFT
      </button>
      <button
        style={downbutton}
        onClick={(e) => moveNinjaHandler(Down)}
        disable={!model.aviable(Down)}
      >
        DOWN
      </button>
      <button
        style={rightbutton}
        onClick={(e) => moveNinjaHandler(Right)}
        disable={!model.aviable(Right)}
      >
        RIGTH
      </button>
      <button style={resetbutton}>RESET</button>
      <button style={pickupbutton}>PICK UP KEY</button>
      <button style={level1button}>LEVEL 1</button>
      <button style={level2button}>LEVEL 2</button>
      <button style={level3button}>LEVEL 3</button>
    </main>
  );
}

export default App;
