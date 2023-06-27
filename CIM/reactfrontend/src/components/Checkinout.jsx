import React, { useState } from "react";

const Checkinout = (props) => {
  const [computer, setComputer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/checkinout/${computer}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ way: props.tag }),
        }
      );
    } catch (error) {
      console.error(error);
    }
    props.onButtonClick();
    setComputer("");
  };

  const handleInputChange = (e) => {
    setComputer(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="computerinput">check {props.tag} pc: </label>
        <input
          type="text"
          id="computerinput"
          name="computerinput"
          value={computer}
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Checkinout;
