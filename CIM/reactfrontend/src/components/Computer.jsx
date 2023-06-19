import React, { useEffect, useState } from "react";

const Computer = (props) => {
  const [computer, setComputer] = useState([]);
  const [ou, setOu] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [checks, setChecks] = useState(0);

  async function handleStepChange(body) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/status/${props.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: body }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || "An error occurred";
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/computers/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        setComputer(data);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3001/api/ou/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setOu(data);
        } else {
          setOu("Not Found");
        }
      });
  }, []);
  return (
    <>
      <div className="border rounded-xl py-1 px-1 hover:bg-gray-600 w-full text-left">
        {!expanded && (
          <div className="grid grid-cols-4 text-center">
            <div>{computer.name}</div>
            <div>{computer.serviceTag}</div>
            <div>{computer.model}</div>
            <div onClick={() => setExpanded(!expanded)}>. . .</div>
          </div>
        )}
        {expanded && (
          <>
            <div className="">
              Last Imaged:{" "}
              {computer?.lastImaged ? computer.lastImaged : "Never"}
            </div>
            <div className="">Warranty Expiration: {computer.warranty}</div>
            <div className="">OU: {ou}</div>
            <br></br>
            {/* THESE NEED TO BE TURNED INTO COMPONENTS */}
            <div className="flex-col justify-items-start">
              <p>Imaging Progress:</p>
              <input
                type="checkbox"
                id="wiped"
                name="wiped"
                onChange={() => handleStepChange("wiped")}
                checked={computer.isWiped}
              ></input>
              <label htmlFor="script"> PC Reset</label>
              <br></br>
              <input
                type="checkbox"
                id="script"
                name="script"
                onChange={() => handleStepChange("scriptRan")}
                checked={computer.scriptRan}
              ></input>
              <label htmlFor="script"> Imaging Script Ran</label>
              <br></br>
              <input
                type="checkbox"
                id="rename"
                name="rename"
                onChange={() => handleStepChange("renamed")}
                checked={computer.isRenamed}
              ></input>
              <label htmlFor="apps"> Apps Installed</label>
              <br></br>
              <input
                type="checkbox"
                id="updates"
                name="updates"
                onChange={() => handleStepChange("updated")}
                checked={computer.isUpdated}
              ></input>
              <label htmlFor="updates"> Windows/Dell Updates</label>
              <br></br>
              <div onClick={() => setExpanded(!expanded)}>. . .</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Computer;
