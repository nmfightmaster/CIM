import React from 'react';
import ComputerRow from './ComputerRow.tsx';
const ComputerTable = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">
                        <th scope="col" className="justify-center items-center px-6 py-2">
                            Device Name
                        </th>
                        <th scope="col" className="justify-center items-center px-6 py-2">
                            Service Tag
                        </th>
                        <th scope="col" className="justify-center items-center px-6 py-2">
                            Imaged On
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ComputerRow name="CHAS1234" serviceTag="1234abc" imagedOn="05/23/23"/>
                    <ComputerRow name="CHAS4567" serviceTag="5678def" imagedOn="05/24/23"/>
                    <ComputerRow name="CHAS8910" serviceTag="91011gh" imagedOn="05/25/23"/>
                </tbody>
            </table>
        </div>
    )
}

export default ComputerTable;