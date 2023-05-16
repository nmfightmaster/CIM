import React from 'react';

const StatusTabs = () => {
    return (
        <>
            <ul className="hidden text-sm font-medium text-gray-500 divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400 rounded-md">
                <li className="w-full">
                    <a href="#" className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Imaged Devices</a>
                </li>
                <li className="w-full">
                    <a href="#" className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Unimaged Devices</a>
                </li>
                <li className="w-full">
                    <a href="#" className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Pending Dell Repairs</a>
                </li>
            </ul>
        </>
    )
}

export default StatusTabs;