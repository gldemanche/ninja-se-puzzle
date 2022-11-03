import logo from "./logo.svg";
import "./App.css";
import { layout } from "./Layout";

function App() {
  const appRef = React.useRef(null);

  return <main style={layout.Appmain} ref={appRef}></main>;
}

export default App;
