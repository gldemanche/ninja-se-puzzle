import React from "react";
import { level1 } from "./model/Levels.js";
import { redrawCanvas } from "./boundary/Boundary.js";
import { Model } from "./model/Model.js";
import { layout } from "./Layout.js";
// you might try this quick and dirty way to position buttons where you want (and other elements)
const upbutton = {
  position: "absolute",
  left: 520,
  top: 80,
};

const leftbutton = {
  position: "absolute",
  left: 470,
  top: 120,
};

const downbutton = {
  position: "absolute",
  left: 520,
  top: 160,
};

const rightbutton = {
  position: "absolute",
  left: 570,
  top: 120,
};

function App() {
  const [model, setModel] = React.useState(new Model(level1));
  const [redraw, forceRedraw] = React.useState(0); // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null); // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current);
  }, [model, redraw]); // arguments that determine when to refresh

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
      <button style={upbutton}>UP </button>
      <button style={leftbutton}>LEFT</button>
      <button style={downbutton}>DOWN</button>
      <button style={rightbutton}>RIGTH</button>
    </main>
  );
}

export default App;
