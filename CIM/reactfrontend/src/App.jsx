import { useEffect, useState } from "react";
import "./App.css";
import ComputerList from "./components/ComputerList";
import Checkin from "./components/Checkin";

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
    <div className="">
      <h1>Computers Needing Imaged</h1>
      <ComputerList names={imageables} rerender={rerender} />
      <h1>Computers Ready to Deploy</h1>
      <ComputerList names={deployables} rerender={rerender} />
      <Checkin onButtonClick={rerender} />
    </div>
  );
}

export default App;
