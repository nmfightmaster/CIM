import React from "react";
import Computer from "./Computer";
const ComputerList = (props) => {
  return (
    <>
      {props.names.map((computer) => (
        <Computer name={computer} />
      ))}
    </>
  );
};

export default ComputerList;
