import React from "react";


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