import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service Tag</th>
            <th>Model</th>
            <th>Status</th>
            <th>Imaged On</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((computer) => (
            <tr key={computer.serviceTag}>
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