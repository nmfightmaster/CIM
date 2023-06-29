import React, { useState } from "react";

const CheckIn = (props) => {
  const [computer, setComputer] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [initials, setInitials] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/checkinout/${computer}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ way: "in" }),
        }
      );
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/logissue/${computer}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: issueDescription,
            initials: initials,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
    props.onButtonClick();
    setComputer("");
    setIssueDescription("");
    setInitials("");
  };

  const handleComputerChange = (e) => {
    setComputer(e.target.value);
  };

  const handleIssueChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleInitialsChange = (e) => {
    setInitials(e.target.value);
  };

  return (
    <>
      <h1>Check In PC:</h1>
      <br></br>
      <div className="flex justify-center ">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3">
            <p className="text-left">Device Name:</p>
            <p></p>
            <p className="text-left">Initials:</p>
            <input
              className="resize-none px-1 py-1"
              type="text"
              id="computerinput"
              name="computerinput"
              value={computer}
              onChange={handleComputerChange}
              required
            />
            <p></p>
            <input
              className="resize-none px-1 py-1"
              type="text"
              id="initialsInput"
              name="initialsInput"
              value={initials}
              onChange={handleInitialsChange}
              required
            />
          </div>
          <br></br>
          <textarea
            rows="6"
            cols="75"
            placeholder="Please enter a brief description of why the PC is being brought into inventory."
            className="resize-none px-1 py-1 h-24 overflow-auto"
            type="text"
            id="issueinput"
            name="issueinput"
            value={issueDescription}
            onChange={handleIssueChange}
            required
          />
          <br></br>
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default CheckIn;
