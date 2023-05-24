import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import AddComputer
 from './addcomputer';
const ComputerList = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/computers');
        setComputers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleComputerAdded = (newComputer) => {
    setComputers((prevComputers) => [...prevComputers, newComputer]);
  };

  return (
    <div>
      <table class = "shadow-lg bg-purple-700 border-collapse">
        <thead>
          <tr class="border px-8 py-4 bg-purple-900">
            <th>Name</th>
            <th>Service Tag</th>
            <th>Model</th>
            <th>Status</th>
            <th>Imaged On</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((computer) => (
            <tr key={computer.serviceTag} class="border px-8 py-4 hover:bg-purple-400">
              <td>{computer.name}</td>
              <td>{computer.serviceTag}</td>
              <td>{computer.model}</td>
              <td>{computer.status}</td>
              <td>{computer.imagedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddComputer onComputerAdded={handleComputerAdded}/>
    </div>
  );
};

export default ComputerList;