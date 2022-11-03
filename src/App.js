import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { layout } from "./Layout";

function App() {
  const appRef = React.useRef(null);

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas
        tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
      />
    </main>
  );
}

export default App;
