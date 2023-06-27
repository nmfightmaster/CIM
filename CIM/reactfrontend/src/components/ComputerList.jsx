import React from "react";
import Computer from "./Computer";
const ComputerList = (props) => {
  return (
    <>
      {props.names.map((computer) => (
        <Computer
          key={computer}
          name={computer}
          rerender={props.rerender}
          imaged={props.imaged}
        />
      ))}
    </>
  );
};

export default ComputerList;
