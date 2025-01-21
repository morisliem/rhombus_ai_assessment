import React from "react"
import "./pagination.sass"

/**
* Represents a Pagination component.
*
* @component
* @param {number} props.currentPage - The current page of a content
* @param {number} props.totalPages - The total page of a content
* @param {function} function - Function to handle changes of page number
* @returns {React.ReactElement} A Pagination element.
*/
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-container">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >Previous</button>
            <span className="page-status">Page {currentPage} of {totalPages}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >Next</button>
        </div>
    )
}


export default Pagination
