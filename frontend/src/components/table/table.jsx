import React from "react";

/**
* Represents a Table component.
*
* @component
* @param {array} props.array - The content of the table
* @param {title} props.title - The title of the table
* @returns {React.ReactElement} A table element.
*/
const Table = ({ array, title }) => {
    return (
        <div>
            <p>{title}</p>
            <table className="table">
                <thead>
                    <tr>
                        {Object.keys(array[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {array.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map(
                                (val, i) => (
                                    <td key={i}>{val}</td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table