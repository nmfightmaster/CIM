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
            <div onClick={() => setExpanded(!expanded)}>. . .</div>
            <ImagingStep
              name={computer.name}
              step="wiped"
              property="isWiped"
              label="PC Wiped"
              checked={computer.isWiped}
              onCheckedChange={handleStepChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Computer;
