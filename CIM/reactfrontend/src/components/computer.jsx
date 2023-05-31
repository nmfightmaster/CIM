import React, { useEffect, useState } from "react";
import axios from "axios";

const Computer = ({ name }) => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/computers/${name}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={handleClick} class="cursor-pointer">
      <p class="transition-colors duration-300">
        {data ? (
          <>
            <div class="flex shadow-lg bg-purple-500 w-full">
              <div class="w-1/3 border p-1">
                <p>{data.name}</p>
              </div>
              <div class="w-1/3 border p-1">
                <p>{data.serviceTag}</p>
              </div>
              <div class="w-1/3 border p-1">
                <p>{data.model}</p>
              </div>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </p>
      <div
        class={`overflow-hidden transition-max-height duration-300 ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <p class="transition-opacity duration-300 bg-purple-500 border text-left">
          Additional text goes here...
        </p>
      </div>
    </div>
  );
};

export default Computer;
