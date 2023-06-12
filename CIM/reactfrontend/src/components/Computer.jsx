import React, { useEffect, useState } from "react";

const Computer = (props) => {
  const [computer, setComputer] = useState(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3001/api/computers/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        setComputer(data);
      });
  }, []);
  return (
    <>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex flex-wrap border rounded-3xl py-2 px-2 hover:bg-gray-600"
      >
        {!expanded && (
          <>
            <div className="w-1/3">{computer.name}</div>
            <div className="w-1/3">{computer.serviceTag}</div>
            <div className="w-1/3">{computer.model}</div>
          </>
        )}
        {expanded && (
          <div className="w-full flex">
            <div className="w-1/3">Status: {computer.status}</div>
            <div className="w-1/3">Last Imaged: {computer.imagedOn}</div>
            <div className="w-1/3">
              Warranty Expiration: {computer.warranty}
            </div>
          </div>
        )}
      </div>
      {/* ------------------------------------------------ */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {computer &&
          Object.keys(computer).map((property) => (
            <p key={property}>
              {property}: {computer[property]}
            </p>
          ))}
      </div>
    </>
  );
};

export default Computer;
