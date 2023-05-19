import React from 'react';

const ComputerRow = (props) => {
    const{name, serviceTag, imagedOn} = props;
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
        onClick={handleToggleCollapse} data-accordion="collapse">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4">
                {serviceTag}
            </td>
            <td className="px-6 py-4">
                {imagedOn}
            </td>   
        </tr>

        {isCollapsed && (
            <tr>
                <td colSpan={6} className="bg-gray-100">
                    <div className="px-4 py-2">
                        <div className="border-l border-gray-300 pl-4 mt-2">
                            TESTING DETAILS
                        </div>
                    </div>
                </td>
            </tr>
        )}
        </>
    )
}

export default ComputerRow;