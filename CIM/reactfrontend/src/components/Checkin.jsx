import React, { useState } from "react";

const Checkin = ({ onButtonClick }) => {
  const [computer, setComputer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/checkin/${computer}`,
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
