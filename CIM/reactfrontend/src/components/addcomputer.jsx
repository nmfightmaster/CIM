import React, { useState } from 'react';
import axios from 'axios';

const AddComputer = ({ onComputerAdded }) => {
    const [name, setName] = useState('');
    const [serviceTag, setServiceTag] = useState('');
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComputer = {
            name,
            serviceTag,
            model,
            status,
            imagedOn: null
        };

        try {
            const response = await axios.post('http://localhost:3001/api/computers', newComputer);
            console.log('New computer added:', response.data);

            onComputerAdded(response.data);

            // Clear the form inputs after successful submission
            setName('');
            setServiceTag('');
            setModel('');
            setStatus('');
        } catch (error) {
            console.error('Error adding new computer:', error);
        }
    };

    return (
        <div>
            <h1>Register New Computer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Service Tag:</label>
                    <input type="text" value={serviceTag} onChange={(e) => setServiceTag(e.target.value)} required />
                </div>
                <div>
                    <label>Model:</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddComputer;
