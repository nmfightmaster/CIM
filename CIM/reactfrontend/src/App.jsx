import { useEffect, useState } from "react";
import "./App.css";
import ComputerList from "./components/ComputerList";
import Checkin from "./components/Checkin";
function App() {
  const [deployables, setDeployables] = useState([]);
  const [imageables, setImageables] = useState([]);
  const [state, setState] = useState(0);

  const handleCheckIn = () => {
    setState(state + 1);
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/computers/deployables")
      .then((response) => response.json())
      .then((data) => {
        setDeployables(data.map((item) => item.name));
      });
  }, [state]);

  useEffect(() => {
    fetch("http://localhost:3001/api/computers/imageables")
      .then((response) => response.json())
      .then((data) => {
        setImageables(data.map((item) => item.name));
      });
  }, [state]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <ComputerList names={imageables} />
      <ComputerList names={deployables} />
      <Checkin onButtonClick={handleCheckIn} />
    </div>
  );
}

export default App;
