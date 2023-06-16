import React, { useEffect, useState } from "react";

const Computer = (props) => {
  const [computer, setComputer] = useState([]);
  const [ou, setOu] = useState([]);
  const [expanded, setExpanded] = useState(false);
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
      <div
        onClick={() => setExpanded(!expanded)}
        className="grid grid-cols-3 border rounded-3xl py-1 px-1 hover:bg-gray-600 max-w-lg"
      >
        {!expanded && (
          <>
            <div className="">{computer.name}</div>
            <div className="">{computer.serviceTag}</div>
            <div className="">{computer.model}</div>
          </>
        )}
        {expanded && (
          <>
            <div className="">Status: {computer.status}</div>
            <div className="">
              Last Imaged:{" "}
              {computer?.lastImaged ? computer.lastImaged : "Never"}
            </div>
            <div className="">Warranty Expiration: {computer.warranty}</div>
            <div className="">OU: {ou}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Computer;
