import { React, useState } from 'react';
import axios from 'axios';

const CheckIn = ({onComputerAdded}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Querying for computer.');
            const response = await axios.post(`http://localhost:3001/api/computers/checkin/${query}`);
            console.log('Computer found.');
            onComputerAdded(response.data);
            setQuery('');
        } catch (error) {
            console.error('Error finding computer:', error);
        }
    }

    return (
        <>
            <h1>Check In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service Tag/Device Name:</label>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} required />
                </div>
                <button type="submit">Check In</button>
            </form>
        </>
    );
}

export default CheckIn;