import React, { useState } from "react";

const ImagingStep = (props) => {
  const [checked, setChecked] = useState(props.checked);
  async function handleStepChange(body) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/status/${props.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: body }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || "An error occurred";
      }
    } catch (err) {
      console.error(err);
    }
    setChecked(!checked);
  }

  return (
    <div>
      <input
        type="checkbox"
        onChange={() => handleStepChange(props.step)}
        checked={checked}
      ></input>
    </div>
  );
};

export default ImagingStep;
