import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import AddComputer from './addcomputer';
import CheckIn from './checkIn';
import Computer from './computer';
const ComputerList = () => {
  
  const [data, setData] = useState([]);

  const handleComputerAdded = (computer) => {
    setData([...data, computer]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/computers`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div class="flex shadow-lg bg-purple-700 w-full">
        <div class="w-1/3 border p-1">
          <p>Name</p>
        </div>
        <div class="w-1/3 border p-1">
          <p>Service Tag</p>
        </div>
        <div class="w-1/3 border p-1">
          <p>Model</p>
        </div>
      </div>
      
      {data ? (
        data.map((computer) => {
          if (computer.inInventory === 1) {
            return (
              <div key={computer.id}>
                <Computer name={computer.name}/>
              </div>
            );  
          }
        })
      ) : (
        "Loading..."
      )}

      
      <AddComputer/>
      <CheckIn onComputerAdded={handleComputerAdded}/>
    </>
  );
};

export default ComputerList;