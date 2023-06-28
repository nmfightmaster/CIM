import React from "react";

const sortByName = () => {};

const sortByServiceTag = () => {};

const sortByModel = () => {};

const SortableHeader = (props) => {
  return (
    <div>
      <br></br>
      <div className="grid grid-cols-3">
        <p>Device Name</p>
        <p>Service Tag</p>
        <p>Model</p>
        <hr></hr>
        <hr></hr>
        <hr></hr>
      </div>
      <br></br>
    </div>
  );
};

export default SortableHeader;
