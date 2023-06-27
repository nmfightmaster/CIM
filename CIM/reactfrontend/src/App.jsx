import { useEffect, useState } from "react";
import "./App.css";
import ComputerList from "./components/ComputerList";
import Checkinout from "./components/Checkinout";

function App() {
  const [deployables, setDeployables] = useState([]);
  const [imageables, setImageables] = useState([]);
  const [state, setState] = useState(0);

  const rerender = () => {
    setState(state + 1);
  };

  useEffect(() => {
    setDeployables([]);
    fetch("http://localhost:3001/api/computers/deployables")
      .then((response) => response.json())
      .then((data) => {
        setDeployables(data.map((item) => item.name));
      });
  }, [state]);

  useEffect(() => {
    setImageables([]);
    fetch("http://localhost:3001/api/computers/imageables")
      .then((response) => response.json())
      .then((data) => {
        setImageables(data.map((item) => item.name));
      });
  }, [state]);

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <h1>Computers Needing Imaged: {imageables.length}</h1>
          <ComputerList names={imageables} rerender={rerender} imaged={false} />
          <Checkinout onButtonClick={rerender} tag="in" />
        </div>
        <div>
          <h1>Computers Ready to Deploy: {deployables.length}</h1>
          <ComputerList names={deployables} rerender={rerender} imaged={true} />
          <Checkinout onButtonClick={rerender} tag="out" />
        </div>
      </div>
    </>
  );
}

export default App;
