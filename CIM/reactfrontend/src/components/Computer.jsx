import React, { useEffect, useState } from "react";

const Computer = (props) => {
  const [computer, setComputer] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3001/api/computers/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        setComputer(data);
      });
  }, []);

  return (
    <>
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
