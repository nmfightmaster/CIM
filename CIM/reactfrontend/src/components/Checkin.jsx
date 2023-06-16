import React, { useState } from "react";

const exists = async (value) => {
  console.log(value);
  fetch(`http://localhost:3001/api/computers/exists/${value}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const Checkin = ({ onButtonClick }) => {
  const [computer, setComputer] = useState("");

  const handleSubmit = async (e) => {
    const computerExists = await exists(computer);
    if (computerExists) {
      e.preventDefault();
      try {
        const response = await fetch(
          `http://localhost:3001/api/updatestatus/${computer}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inInventory: 1 }),
          }
        );
      } catch (error) {
        console.error(error);
      }
      onButtonClick();
      setComputer("");
    } else {
      alert(`Computer ${computer} does not exist.`);
    }
  };

  const handleInputChange = (e) => {
    setComputer(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="computerinput">Computer</label>
        <input
          type="text"
          id="computerinput"
          name="computerinput"
          value={computer}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Checkin;
