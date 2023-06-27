import React, { useEffect, useState } from "react";
import ImagingStep from "./ImagingStep";

const Computer = (props) => {
  const [computer, setComputer] = useState([]);
  const [ou, setOu] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleStepChange = (propertyName, newValue) => {
    setComputer((prevComputer) => ({
      ...prevComputer,
      [propertyName]: newValue,
    }));
  };
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
  const markImaged = () => {
    fetch(`http://localhost:3001/api/imaged/${props.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        props.rerender();
      });
    setImaged(true);
  };

  return (
    <>
      <div className="border rounded-xl py-1 px-1 hover:bg-gray-600 w-full text-left">
        <div className="grid grid-cols-4 text-center">
          <div>{computer.name}</div>
          <div>{computer.serviceTag}</div>
          <div>{computer.model}</div>
          <div onClick={() => setExpanded(!expanded)}>
            {!expanded ? "+" : "-"}
          </div>
        </div>
        {expanded && (
          <>
            <hr></hr>
            <div className="grid grid-cols-2">
              <div>
                <div className="">
                  Last Imaged:{" "}
                  {computer?.imagedOn ? computer.imagedOn : "Never"}
                </div>
                <div className="">Warranty Expiration: {computer.warranty}</div>
                <div className="">OU: {ou}</div>
                {!props.imaged && (
                  <>
                    <br></br>
                    <ImagingStep
                      name={computer.name}
                      step="wiped"
                      property="isWiped"
                      label="PC Wiped"
                      checked={computer.isWiped}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="scriptRan"
                      property="scriptRan"
                      label="Imaging Script Ran"
                      checked={computer.scriptRan}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="renamed"
                      property="isRenamed"
                      label="PC Renamed"
                      checked={computer.isRenamed}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="updated"
                      property="isUpdated"
                      label="PC Updated (Dell Command/Windows Updates)"
                      checked={computer.isUpdated}
                      onCheckedChange={handleStepChange}
                    />
                  </>
                )}
              </div>
              <div>
                <p>Quick Actions:</p>
                <button
                  className="disabled:opacity-25"
                  onClick={markImaged}
                  disabled={
                    !(
                      computer.isWiped &&
                      computer.scriptRan &&
                      computer.isRenamed &&
                      computer.isUpdated
                    )
                  }
                  hidden={
                    computer.isWiped &&
                    computer.scriptRan &&
                    computer.isRenamed &&
                    computer.isUpdated &&
                    props.imaged
                  }
                >
                  Mark as Imaged
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Computer;
